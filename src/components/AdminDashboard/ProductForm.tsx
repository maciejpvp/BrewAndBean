import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import { apiClient } from '../../lib/apiClient';
import { fetchProductById, updateProduct } from '../../api/products';
import type { Product } from '../../types/product';
import styles from './ProductForm.module.css';

import { CoreNarrativeSection } from './ProductFormParts/CoreNarrativeSection';
import { TechSpecsSection } from './ProductFormParts/TechSpecsSection';
import { SensoryAttributesSection } from './ProductFormParts/SensoryAttributesSection';
import { InventoryLogicSection } from './ProductFormParts/InventoryLogicSection';
import { CategorizationSection } from './ProductFormParts/CategorizationSection';
import { VisualAssetsSection } from './ProductFormParts/VisualAssetsSection';

export interface TechSpec {
  label: string;
  value: string;
}

export interface Attribute {
  key: string;
  value: string;
}

interface ProductFormData {
  name: string;
  description: string;
  tech_spec: TechSpec[];
  attributes: Attribute[];
  stock: string;
  price: string;
  categories: string[];
}

type Status = "idle" | "submitting" | "uploading" | "success" | "error";

interface PresignedPostData {
  uploadUrl: string;
  fields: string;
}

interface CreateProductResponse {
  presignedPosts?: PresignedPostData[];
}

interface ProductFormProps {
  isEdit?: boolean;
}

const DEFAULT_NEW_PRODUCT: ProductFormData = {
  name: "Bialetti Moka Express",
  description: "The original stovetop espresso maker, serving up authentic Italian coffee since 1933. Crafted from high-quality polished aluminum with its iconic octagonal shape for perfect heat diffusion.",
  tech_spec: [
    { label: "Material", value: "Food-grade Aluminum" },
    { label: "Capacity", value: "3-Cup (6.5 oz)" },
    { label: "Origin", value: "Made in Italy" }
  ],
  attributes: [
    { key: "Compatibility", value: "Gas, Electric, Ceramic" },
    { key: "Maintenance", value: "Hand Wash Only" }
  ],
  stock: "150",
  price: "35.00",
  categories: ["equipment"],
};

const EMPTY_PRODUCT: ProductFormData = {
  name: "", description: "", tech_spec: [], attributes: [], stock: "", price: "", categories: [],
};

export default function ProductForm({ isEdit }: ProductFormProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const isEditMode = isEdit ?? !!id;

  // Initialize with defaults if creating, or empty if editing (to be populated by useEffect)
  const [formData, setFormData] = useState<ProductFormData>(isEditMode ? EMPTY_PRODUCT : DEFAULT_NEW_PRODUCT);
  const [initialProduct, setInitialProduct] = useState<Product | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  }>({
    open: false,
    message: '',
    severity: 'info'
  });

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (!isEditMode) return;

    const loadProduct = async () => {
      let product = location.state?.product as Product;

      if (!product && id) {
        try {
          product = await fetchProductById(id);
        } catch (error) {
          console.error("Failed to fetch product:", error);
          showSnackbar("Failed to load product data", "error");
          setTimeout(() => navigate("/dashboard/inventory"), 1500);
          return;
        }
      }

      if (product) {
        setInitialProduct(product);
        setFormData({
          name: product.name,
          description: product.description,
          tech_spec: product.tech_spec || [],
          attributes: Object.entries(product.attributes || {}).map(([key, value]) => ({
            key,
            value: String(value)
          })),
          stock: String(product.stock),
          price: String(product.price),
          categories: product.categories.map(c => c.name),
        });
      }
    };

    loadProduct();
  }, [id, isEditMode, location.state, navigate]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechSpecChange = (index: number, field: 'label' | 'value', value: string) => {
    const updated = [...formData.tech_spec];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, tech_spec: updated }));
  };

  const addTechSpecRow = () => {
    setFormData((prev) => ({ ...prev, tech_spec: [...prev.tech_spec, { label: "", value: "" }] }));
  };

  const removeTechSpecRow = (index: number) => {
    setFormData((prev) => ({ ...prev, tech_spec: prev.tech_spec.filter((_, i) => i !== index) }));
  };

  const handleAttributeChange = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...formData.attributes];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, attributes: updated }));
  };

  const addAttributeRow = () => {
    setFormData((prev) => ({ ...prev, attributes: [...prev.attributes, { key: "", value: "" }] }));
  };

  const removeAttributeRow = (index: number) => {
    setFormData((prev) => ({ ...prev, attributes: prev.attributes.filter((_, i) => i !== index) }));
  };

  const addCategory = () => {
    const newTag = tagInput.trim();
    if (newTag && !formData.categories.includes(newTag)) {
      setFormData((prev) => ({ ...prev, categories: [...prev.categories, newTag] }));
      setTagInput("");
    }
  };

  const handleAddCategoryKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCategory();
    }
  };

  const removeCategory = (index: number) => {
    setFormData((prev) => ({ ...prev, categories: prev.categories.filter((_, i) => i !== index) }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Helper to format attributes array into an object for comparison and payload
  const getAttributesObject = () => formData.attributes.reduce((acc, attr) => {
    if (attr.key) acc[attr.key] = attr.value;
    return acc;
  }, {} as Record<string, string>);

  const getChangedFields = () => {
    if (!initialProduct) return {};
    const changed: Partial<Product> = {};

    if (formData.name !== initialProduct.name) changed.name = formData.name;
    if (formData.description !== initialProduct.description) changed.description = formData.description;

    const newPrice = parseFloat(formData.price);
    if (newPrice !== initialProduct.price) changed.price = newPrice;

    const newStock = parseInt(formData.stock);
    if (newStock !== initialProduct.stock) changed.stock = newStock;

    if (JSON.stringify(formData.tech_spec) !== JSON.stringify(initialProduct.tech_spec || [])) {
      changed.tech_spec = JSON.stringify(formData.tech_spec) as unknown as TechSpec[]; // Adjusted type safety
    }

    const currentAttributes = getAttributesObject();
    if (JSON.stringify(currentAttributes) !== JSON.stringify(initialProduct.attributes || {})) {
      changed.attributes = JSON.stringify(currentAttributes) as unknown as Record<string, string>; // Adjusted type safety
    }

    return changed;
  };

  const getDirtyStatus = () => {
    if (!isEditMode || !initialProduct) return {};

    const techSpecDirtyRows = formData.tech_spec.map((spec, i) => {
      const initial = initialProduct.tech_spec?.[i];
      return !initial || spec.label !== initial.label || spec.value !== initial.value;
    });

    const initialAttrsObj = (initialProduct.attributes || {}) as Record<string, string>;
    const attributeDirtyRows = formData.attributes.map((attr) => {
      if (!attr.key) return false;
      const initialValue = initialAttrsObj[attr.key];
      return initialValue === undefined || String(attr.value) !== String(initialValue);
    });

    return {
      name: formData.name !== initialProduct.name,
      description: formData.description !== initialProduct.description,
      price: parseFloat(formData.price) !== initialProduct.price,
      stock: parseInt(formData.stock) !== initialProduct.stock,
      techSpecDirtyRows,
      attributeDirtyRows,
    };
  };

  const dirtyStatus = getDirtyStatus();
  const isBusy = status === "submitting" || status === "uploading";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      if (isEditMode && id) {
        const changedFields = getChangedFields();

        if (Object.keys(changedFields).length === 0) {
          showSnackbar("No changes detected.", "info");
          setStatus("idle");
          return;
        }

        await updateProduct({
          id,
          data: changedFields,
          version: initialProduct?.version || 0
        });
        setStatus("success");
        showSnackbar("Product updated successfully!", "success");
        setTimeout(() => navigate("/dashboard/inventory"), 1500);
      } else {
        const productPayload = {
          ...formData,
          attributes: JSON.stringify(getAttributesObject()),
          tech_spec: JSON.stringify(formData.tech_spec),
          media: selectedFiles.map((file, i) => ({ type: file.type, id: String(i), isMain: i === 0 }))
        };

        const { data: responseData } = await apiClient.post<CreateProductResponse>('/products/upload', productPayload);

        if (responseData.presignedPosts?.length) {
          setStatus("uploading");

          await Promise.all(responseData.presignedPosts.map(async (presignedData, index) => {
            const fileToUpload = selectedFiles[index];
            if (!fileToUpload) return;

            const s3FormData = new FormData();
            const s3Fields = JSON.parse(presignedData.fields);

            Object.entries(s3Fields).forEach(([key, value]) => {
              s3FormData.append(key, String(value));
            });

            if (!('Content-Type' in s3Fields)) {
              s3FormData.append('Content-Type', fileToUpload.type);
            }
            s3FormData.append('file', fileToUpload);

            await fetch(presignedData.uploadUrl, {
              method: 'POST',
              body: s3FormData,
              mode: 'no-cors',
            });
          }));
        }

        setStatus("success");
        showSnackbar("Product and images uploaded successfully!", "success");
        setTimeout(() => navigate("/dashboard/inventory"), 1500);
      }
    } catch (error: unknown) {
      console.error(error);
      setStatus("error");
      showSnackbar(error instanceof Error ? error.message : "An unknown error occurred", "error");
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <div>
          <nav className={styles.breadcrumbs}>
            <span onClick={() => navigate("/dashboard/inventory")}>Inventory</span>
            <span>/</span>
            <span className={styles.breadcrumbActive}>{isEditMode ? "Edit Product" : "New Selection"}</span>
          </nav>
          <h2 className={styles.pageTitle}>{isEditMode ? "Modify Product" : "Product Definition"}</h2>
        </div>
        <div className={styles.headerActions}>
          <button type="button" className={styles.btnSecondary} onClick={() => navigate("/dashboard/inventory")}>
            Cancel
          </button>
          <button type="submit" className={styles.btnPrimary} disabled={isBusy}>
            {isBusy ? (status === "submitting" ? "Saving..." : "Uploading...") : (isEditMode ? "Update Product" : "Publish Product")}
          </button>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          <CoreNarrativeSection
            name={formData.name}
            description={formData.description}
            handleInputChange={handleInputChange}
            dirtyName={dirtyStatus.name}
            dirtyDescription={dirtyStatus.description}
          />
          <TechSpecsSection
            techSpecs={formData.tech_spec}
            handleTechSpecChange={handleTechSpecChange}
            addTechSpecRow={addTechSpecRow}
            removeTechSpecRow={removeTechSpecRow}
            dirtyRows={dirtyStatus.techSpecDirtyRows}
          />
          <SensoryAttributesSection
            attributes={formData.attributes}
            handleAttributeChange={handleAttributeChange}
            addAttributeRow={addAttributeRow}
            removeAttributeRow={removeAttributeRow}
            dirtyRows={dirtyStatus.attributeDirtyRows}
          />
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          <InventoryLogicSection
            price={formData.price}
            stock={formData.stock}
            handleInputChange={handleInputChange}
            dirtyPrice={dirtyStatus.price}
            dirtyStock={dirtyStatus.stock}
          />
          <CategorizationSection
            categories={formData.categories}
            tagInput={tagInput}
            setTagInput={setTagInput}
            addCategory={addCategory}
            removeCategory={removeCategory}
            handleAddCategoryKeyPress={handleAddCategoryKeyPress}
            disabled={isEditMode}
          />
          <VisualAssetsSection
            selectedFiles={selectedFiles}
            handleFileChange={handleFileChange}
            removeFile={removeFile}
            disabled={isEditMode}
          />
        </div>
      </div>

      <div className={styles.bottomGuard}>
        <p>Artisan Crema Inventory Management System v4.2</p>
        <div className={styles.bottomGuardLinks}>
          <a href="#">Documentation</a>
          <a href="#">Inventory Policy</a>
        </div>
      </div>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </form>
  );
}
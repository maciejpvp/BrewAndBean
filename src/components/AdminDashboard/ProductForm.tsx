import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { apiClient } from '../../lib/apiClient';
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

export default function ProductForm() {
  const [formData, setFormData] = useState<ProductFormData>({
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
  });

  const [tagInput, setTagInput] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechSpecChange = (index: number, field: 'label' | 'value', value: string) => {
    const updated = [...formData.tech_spec];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, tech_spec: updated }));
  };

  const addTechSpecRow = () => {
    setFormData((prev) => ({
      ...prev,
      tech_spec: [...prev.tech_spec, { label: "", value: "" }]
    }));
  };

  const removeTechSpecRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tech_spec: prev.tech_spec.filter((_, i) => i !== index)
    }));
  };

  const handleAttributeChange = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...formData.attributes];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, attributes: updated }));
  };

  const addAttributeRow = () => {
    setFormData((prev) => ({
      ...prev,
      attributes: [...prev.attributes, { key: "", value: "" }]
    }));
  };

  const removeAttributeRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index)
    }));
  };

  const addCategory = () => {
    if (tagInput.trim() && !formData.categories.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, tagInput.trim()]
      }));
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
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files as FileList)]);
    }
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const attributesObj = formData.attributes.reduce((acc, attr) => {
        if (attr.key) acc[attr.key] = attr.value;
        return acc;
      }, {} as Record<string, string>);

      const productPayload = {
        name: formData.name,
        description: formData.description,
        tech_spec: JSON.stringify(formData.tech_spec),
        attributes: JSON.stringify(attributesObj),
        stock: formData.stock,
        price: formData.price,
        categories: formData.categories,
        media: selectedFiles.map((file, index) => ({
          type: file.type,
          id: String(index),
          isMain: index === 0
        }))
      };

      const { data: responseData } = await apiClient.post<CreateProductResponse>('/products/upload', productPayload);

      if (responseData.presignedPosts && responseData.presignedPosts.length > 0) {
        setStatus("uploading");
        const uploadPromises = responseData.presignedPosts.map(async (presignedData, index) => {
          const fileToUpload = selectedFiles[index];
          if (!fileToUpload) return;
          const s3FormData = new FormData();
          const s3Fields = JSON.parse(presignedData.fields);
          
          Object.entries(s3Fields).forEach(([key, value]) => {
            s3FormData.append(key, value as string);
          });
          
          if (!('Content-Type' in s3Fields)) {
            s3FormData.append('Content-Type', fileToUpload.type);
          }
          s3FormData.append('file', fileToUpload);

          const s3Response = await fetch(presignedData.uploadUrl, {
            method: 'POST',
            body: s3FormData,
          });
          if (!s3Response.ok) {
            throw new Error(`Failed to upload image ${index + 1} to S3`);
          }
        });
        await Promise.all(uploadPromises);
      }

      setStatus("success");
      alert("Product and images uploaded successfully!");
    } catch (error: unknown) {
      console.error(error);
      setStatus("error");
      if (error instanceof Error) {
        alert(error.message || "An error occurred");
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <div>
          <nav className={styles.breadcrumbs}>
            <span>Inventory</span>
            <span>/</span>
            <span className={styles.breadcrumbActive}>New Selection</span>
          </nav>
          <h2 className={styles.pageTitle}>Product Definition</h2>
        </div>
        <div className={styles.headerActions}>
          <button type="button" className={styles.btnSecondary}>Cancel</button>
          <button 
            type="submit" 
            className={styles.btnPrimary}
            disabled={status === "submitting" || status === "uploading"}
          >
            {status === "idle" || status === "success" || status === "error" ? "Publish Product" : 
             status === "submitting" ? "Saving..." : "Uploading..."}
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
          />
          <TechSpecsSection 
            techSpecs={formData.tech_spec}
            handleTechSpecChange={handleTechSpecChange}
            addTechSpecRow={addTechSpecRow}
            removeTechSpecRow={removeTechSpecRow}
          />
          <SensoryAttributesSection 
            attributes={formData.attributes}
            handleAttributeChange={handleAttributeChange}
            addAttributeRow={addAttributeRow}
            removeAttributeRow={removeAttributeRow}
          />
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          <InventoryLogicSection 
            price={formData.price}
            stock={formData.stock}
            handleInputChange={handleInputChange}
          />
          <CategorizationSection 
            categories={formData.categories}
            tagInput={tagInput}
            setTagInput={setTagInput}
            addCategory={addCategory}
            removeCategory={removeCategory}
            handleAddCategoryKeyPress={handleAddCategoryKeyPress}
          />
          <VisualAssetsSection 
            selectedFiles={selectedFiles}
            handleFileChange={handleFileChange}
            removeFile={removeFile}
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
    </form>
  );
}
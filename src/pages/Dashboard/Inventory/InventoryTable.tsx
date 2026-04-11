import { useState, useMemo, useEffect, useRef } from 'react';
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/material/Box';
import type { Product } from '../../../types/product';
import styles from './Inventory.module.css';
import { CDN_URL } from '../../../lib/apiClient';
import { Chip } from '@mui/material';
import type { StockStatus } from './types';
import { AddStockModal } from '../../../components/AdminDashboard/Inventory/AddStockModal';

interface InventoryTableProps {
    items: Product[];
    loading: boolean;
    hasNextPage?: boolean;
    paginationModel?: { page: number; pageSize: number };
    onPaginationModelChange?: (model: { page: number; pageSize: number }) => void;
}

const getColumns = (onEditClick: (product: Product) => void): GridColDef<Product>[] => [
    {
        field: 'name',
        headerName: 'Product',
        flex: 2,
        renderCell: (params: GridRenderCellParams<Product>) => {
            const itemKey = params.row.media?.at(0)?.key;
            return (
                <div className={styles.productCell}>
                    <div className={styles.productImage}>
                        {itemKey && <img src={`${CDN_URL}/${itemKey}`} alt={String(params.value)} />}
                    </div>
                    <h3 className={styles.productName}>{params.value}</h3>
                </div>
            );
        },
    },
{
  field: 'category',
  headerName: 'Categorization',
  flex: 1.5,
  renderCell: (params: GridRenderCellParams<Product>) => {
    const categories: string[] = params.row.categories?.map((cat) => cat.name) || [];

    return (
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', height: '100%' }}>
        {categories.map((category, index) => (
          <Chip
            key={index}
            label={category}
            sx={{
              backgroundColor: 'var(--surface-variant)',
              color: 'var(--text-muted)',
              fontFamily: '"Manrope", sans-serif',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              height: '24px',
              '& .MuiChip-label': { px: 1 }
            }}
          />
        ))}
      </Box>
    );
  },
},
    {
        field: 'price',
        headerName: 'Price',
        flex: 1,
        renderCell: (params: GridRenderCellParams<Product>) => (
            <div>
                <span className={styles.price}>${params.value.toFixed(2)}</span>
            </div>
        ),
    },
    {
        field: 'stock',
        headerName: 'Stock',
        flex: 1,
        renderCell: (params: GridRenderCellParams<Product>) => {
let color: StockStatus = "green";
         // Less than 100 units is yellow, less than 50 is red
         if (params.value < 100) {
            color = "yellow";
         }
         if (params.value < 50) {
            color = "red";
         }
         return (
         <div className={styles.stockCell}>
                <div className={`${styles.stockDot} ${styles[color]}`} />
                <span>{params.value} Units</span>
            </div>)
        },
    },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        headerAlign: 'left',
        align: 'left',
        sortable: false,
        renderCell: (params: GridRenderCellParams<Product>) => (
            <div className={styles.actionsCell}>
                <button onClick={() => onEditClick(params.row)} className={styles.actionBtn} aria-label="Edit">
                    <EditIcon className={styles.actionIcon} />
                </button>
                <button onClick={() => console.log('Delete')} className={styles.actionBtn} aria-label="Delete">
                    <DeleteOutlineIcon className={styles.actionIcon} />
                </button>
            </div>
        ),
    },
];

const calculatePageSize = (dataGridHeight: number, itemHeight: number) => {
    const headerHeight = 48; // DataGrid columnHeaderHeight
    const footerHeight = 56; // DataGrid default footer height
    const buffer = 40;
    const availableHeight = dataGridHeight - headerHeight - footerHeight - buffer;
    console.log('availableHeight', availableHeight);
    const pageSize = Math.floor((availableHeight - 1) / itemHeight);
    console.log('pageSize', pageSize);
    return pageSize > 0 ? pageSize : 1;
};

export const InventoryTable = ({ 
    items, 
    loading, 
    hasNextPage,
    paginationModel,
    onPaginationModelChange,
}: InventoryTableProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [pageSize, setPageSize] = useState(1);

    useEffect(() => {
        if (containerRef.current) {
            const height = containerRef.current.clientHeight;
            const calculatedSize = calculatePageSize(height, 80);
            setPageSize(calculatedSize);
            
            if (onPaginationModelChange && paginationModel) {
                onPaginationModelChange({ ...paginationModel, pageSize: calculatedSize });
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEditClick = (product: Product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const columns = useMemo(() => getColumns(handleEditClick), []);

    return (
        <>
        <Box  className={styles.tableContainer} sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            '& .MuiDataGrid-root': {
                border: 'none',
                fontFamily: '"Manrope", sans-serif',
                flex: 1,
            },
            '& .MuiDataGrid-main': {
                backgroundColor: 'transparent',
            },
            '& .MuiDataGrid-columnHeaders': {
                borderBottom: 'none',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontSize: '0.875rem',
                fontWeight: 600,
                minHeight: '48px !important',
                maxHeight: '48px !important',
                lineHeight: '48px !important',
            },
            '& .MuiDataGrid-columnSeparator': {
                display: 'none',
            },
            '& .MuiDataGrid-cell': {
                borderBottom: 'none',
                display: 'flex',
                alignItems: 'center',
                padding: '0 1rem',
            },
            '& .MuiDataGrid-row': {
                margin: '0.75rem 0',
                borderRadius: '8px',
                minHeight: '80px !important',
                maxHeight: '80px !important',
                backgroundColor: 'transparent',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                    backgroundColor: 'rgba(38, 23, 12, 0.03)',
                },
                '&.Mui-selected': {
                    backgroundColor: 'rgba(38, 23, 12, 0.05)',
                    '&:hover': {
                        backgroundColor: 'rgba(38, 23, 12, 0.08)',
                    },
                },
            },
            '& .MuiDataGrid-virtualScroller': {
                padding: '0 1rem',
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(38, 23, 12, 0.1)',
                    borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: 'rgba(38, 23, 12, 0.25)',
                },
            },
            '& .MuiCircularProgress-root': {
                color: 'var(--primary)',
            }
        }}>
            <DataGrid
            ref={containerRef}
                rows={items}
                columns={columns}
                disableRowSelectionOnClick
                rowHeight={80}
                columnHeaderHeight={48}
                loading={loading && items.length === 0}
                paginationMode="server"
                paginationMeta={{
                    hasNextPage: hasNextPage,
                }}
                rowCount={-1}
                paginationModel={paginationModel}
                onPaginationModelChange={onPaginationModelChange}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize },
                    },
                }}
                pageSizeOptions={[pageSize]}
            />
        </Box>
        <AddStockModal 
            open={modalOpen} 
            onClose={handleCloseModal} 
            product={selectedProduct} 
        />
        </>
    );
};

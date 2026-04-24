import React, { useState, useRef, useLayoutEffect } from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText, IconButton, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import type { Product } from '../../../types/product';
import styles from './Inventory.module.css';

interface RowActionsProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
    isMobile?: boolean;
}

export const RowActions: React.FC<RowActionsProps> = ({ product, onEdit, onDelete, isMobile }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [containerWidth, setContainerWidth] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const open = Boolean(anchorEl);

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            if (entries[0]) {
                setContainerWidth(entries[0].contentRect.width);
            }
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleAction = (action: () => void) => {
        action();
        handleCloseMenu();
    };

    const actions = [
        {
            id: 'edit',
            label: 'Edit Product',
            icon: <EditIcon className={styles.actionIcon} />,
            menuIcon: <EditIcon fontSize="small" />,
            onClick: () => onEdit(product),
            color: 'var(--secondary)',
            tooltip: 'Edit Product'
        },
        {
            id: 'copy',
            label: 'Copy ID',
            icon: <ContentCopyIcon className={styles.actionIcon} />,
            menuIcon: <ContentCopyIcon fontSize="small" />,
            onClick: () => navigator.clipboard.writeText(product.id),
            color: 'var(--secondary)',
            tooltip: 'Copy ID'
        },
        {
            id: 'delete',
            label: 'Delete Product',
            icon: <DeleteOutlineIcon className={styles.actionIcon} />,
            menuIcon: <DeleteOutlineIcon fontSize="small" />,
            onClick: () => onDelete(product),
            color: '#d32f2f',
            tooltip: 'Delete Product'
        },
    ];

    const BTN_WIDTH = 40;
    const GAP = 16;
    const MENU_BTN_WIDTH = 44;

    let numVisible = actions.length;

    if (isMobile) {
        numVisible = 0;
    } else if (containerWidth !== null) {
        const totalAllWidth = actions.length * BTN_WIDTH + (actions.length - 1) * GAP;

        if (containerWidth < totalAllWidth) {
            // Find how many fit with menu
            numVisible = 0;
            for (let i = actions.length - 1; i >= 0; i--) {
                const widthWithMenu = i * BTN_WIDTH + MENU_BTN_WIDTH + i * GAP;
                if (containerWidth >= widthWithMenu) {
                    numVisible = i;
                    break;
                }
            }
        }
    }

    const visibleActions = actions.slice(0, numVisible);
    const menuActions = actions.slice(numVisible);

    return (
        <div ref={containerRef} className={styles.actionsCell} style={{ minWidth: '40px', width: '100%' }}>
            {visibleActions.map((action) => (
                <Tooltip key={action.id} title={action.tooltip}>
                    <button
                        onClick={action.onClick}
                        className={styles.actionBtn}
                        aria-label={action.label}
                        style={{ color: action.color }}
                    >
                        {action.icon}
                    </button>
                </Tooltip>
            ))}

            {menuActions.length > 0 && (
                <>
                    <Tooltip title="More Actions">
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleOpenMenu}
                            sx={{
                                color: 'var(--secondary)',
                                padding: '6px',
                                '&:hover': {
                                    backgroundColor: 'rgba(119, 90, 25, 0.08)',
                                }
                            }}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                        slotProps={{
                            paper: {
                                sx: {
                                    backgroundColor: 'var(--surface)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    borderRadius: '8px',
                                    minWidth: '160px',
                                    border: '1px solid var(--surface-variant)',
                                }
                            }
                        }}
                    >
                        {menuActions.map((action) => (
                            <MenuItem
                                key={action.id}
                                onClick={() => handleAction(action.onClick)}
                                sx={{ gap: 1, py: 1.5 }}
                            >
                                <ListItemIcon sx={{ minWidth: '32px !important', color: action.color }}>
                                    {action.menuIcon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={action.label}
                                    primaryTypographyProps={{
                                        fontSize: '0.875rem',
                                        fontFamily: '"Manrope", sans-serif',
                                        fontWeight: 500,
                                        color: action.id === 'delete' ? '#d32f2f' : 'var(--text-main)'
                                    }}
                                />
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            )}
        </div>
    );
};

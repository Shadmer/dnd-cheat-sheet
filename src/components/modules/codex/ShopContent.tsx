import React from 'react';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { styled } from '@mui/system';
import { IShop } from '@src/interfaces/codex';

interface ShopContentProps {
    shop: IShop;
}

const StyledHeadCell = styled(TableCell)(({ theme }) => ({
    textAlign: 'left',
    padding: '8px',
    borderBottom: '1px solid',
    borderRight: '1px solid',
    borderColor: 'divider',
    backgroundColor: theme.palette.background.default,
    fontWeight: 'bold',
    minWidth: '120px',
}));

const StyledBodyCell = styled(TableCell)(() => ({
    textAlign: 'left',
    padding: '8px',
    borderBottom: '1px solid',
    borderRight: '1px solid',
    borderColor: 'divider',
    minWidth: '120px',
}));

export const ShopContent: React.FC<ShopContentProps> = ({ shop }) => {
    return (
        <Box>
            {shop.categories.map((category, categoryIndex) => (
                <Box key={categoryIndex} mb={4}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {category.categoryName}
                    </Typography>
                    <TableContainer component={Paper}>
                        <Box
                            sx={{
                                width: '100%',
                                overflowX: 'auto',
                                '&::-webkit-scrollbar-thumb': {
                                    background: (theme) =>
                                        theme.palette.primary.main,
                                    borderRadius: '3px',
                                },
                                '&::-webkit-scrollbar': {
                                    height: 'calc(var(--border-width) * 1.5)',
                                },
                            }}
                        >
                            <Table
                                sx={{
                                    minWidth: '650px',
                                    borderCollapse: 'collapse',
                                }}
                            >
                                <TableHead>
                                    <TableRow
                                        sx={{
                                            borderBottom: '1px solid',
                                            borderColor: 'divider',
                                        }}
                                    >
                                        <StyledHeadCell>
                                            <b>Название</b>
                                        </StyledHeadCell>
                                        <StyledHeadCell>
                                            <b>Цена</b>
                                        </StyledHeadCell>
                                        <StyledHeadCell>
                                            <b>Описание</b>
                                        </StyledHeadCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {category.items.map((item, itemIndex) => (
                                        <TableRow
                                            key={itemIndex}
                                            sx={{
                                                borderBottom: '1px solid',
                                                borderColor: 'divider',
                                            }}
                                        >
                                            <StyledBodyCell width={200}>
                                                {item.name}
                                            </StyledBodyCell>
                                            <StyledBodyCell width={200}>
                                                {item.price}
                                            </StyledBodyCell>
                                            <StyledBodyCell width={200}>
                                                {item.description}
                                            </StyledBodyCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </TableContainer>
                </Box>
            ))}
        </Box>
    );
};

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
import { IShop } from '@src/interfaces/codex';

interface ShopContentProps {
    shop: IShop;
}

export const ShopContent: React.FC<ShopContentProps> = ({ shop }) => {
    return (
        <Box>
            {shop.categories.map((category, categoryIndex) => (
                <Box key={categoryIndex} mb={4}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {category.categoryName}
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <b>Название</b>
                                    </TableCell>
                                    <TableCell>
                                        <b>Цена</b>
                                    </TableCell>
                                    <TableCell>
                                        <b>Описание</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {category.items.map((item, itemIndex) => (
                                    <TableRow key={itemIndex}>
                                        <TableCell width={200}>
                                            {item.name}
                                        </TableCell>
                                        <TableCell width={200}>
                                            {item.price}
                                        </TableCell>
                                        <TableCell width={200}>
                                            {item.description}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            ))}
        </Box>
    );
};
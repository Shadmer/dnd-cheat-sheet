import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    Typography,
    Box,
    Divider,
    Link,
    List,
    ListItem,
    ListItemText,
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@mui/material';
import { CodexService } from '@src/services/CodexService';
import { useDialog } from '@src/providers/DialogProvider';

type MarkdownRendererProps = {
    markdown: string;
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
    markdown,
}) => {
    const navigate = useNavigate();
    const { fetchPage } = CodexService();
    const { openDialog, closeDialog } = useDialog();

    const modalOpen = async (campaign: string, section: string, id: string) => {
        const { title, description } = await fetchPage(campaign, section, id);
        const content = <MarkdownRenderer markdown={description ?? ''} />;
        const link = `/game/codex/${section}/${id}`;
        const footerContent = (
            <Button
                onClick={() => {
                    navigate(link);
                    closeDialog();
                }}
            >
                Перейти к странице
            </Button>
        );

        openDialog(title, content, footerContent);
    };

    const handleLink = (href: string) => {
        const parts = href.split('/').filter((part) => part) ?? [];
        if (parts[0] === '#modal') {
            modalOpen(parts[1], parts[2], parts[3]);
        } else {
            navigate(href);
        }
    };

    return (
        <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
                a(props) {
                    return (
                        <Link
                            sx={{ cursor: 'pointer' }}
                            onClick={() =>
                                props?.href && handleLink(props.href)
                            }
                        >
                            {props.children}
                        </Link>
                    );
                },
                blockquote(props) {
                    return (
                        <Box
                            component="blockquote"
                            sx={{
                                pl: 2,
                                borderLeft: (theme) =>
                                    `4px solid ${theme.palette.grey[500]}`,
                                color: (theme) => theme.palette.grey[500],
                                my: 2,
                            }}
                        >
                            {props.children}
                        </Box>
                    );
                },
                code(props) {
                    return (
                        <Box
                            component="code"
                            sx={{
                                padding: '8px',
                                borderRadius: '4px',
                                display: 'block',
                                whiteSpace: 'pre',
                                overflowX: 'auto',
                                backgroundColor: (theme) =>
                                    theme.palette.background.default,
                            }}
                        >
                            {props.children}
                        </Box>
                    );
                },
                em(props) {
                    return (
                        <Typography component="em" sx={{ fontStyle: 'italic' }}>
                            {props.children}
                        </Typography>
                    );
                },
                h1(props) {
                    return (
                        <Typography variant="h1" component="h1" mt={3}>
                            {props.children}
                        </Typography>
                    );
                },
                h2(props) {
                    return (
                        <Typography variant="h2" component="h2" mt={3}>
                            {props.children}
                        </Typography>
                    );
                },
                h3(props) {
                    return (
                        <Typography variant="h3" component="h3" mt={3}>
                            {props.children}
                        </Typography>
                    );
                },
                h4(props) {
                    return (
                        <Typography variant="h4" component="h4" mt={3}>
                            {props.children}
                        </Typography>
                    );
                },
                h5(props) {
                    return (
                        <Typography variant="h5" component="h5" mt={3}>
                            {props.children}
                        </Typography>
                    );
                },
                h6(props) {
                    return (
                        <Typography variant="h6" component="h6" mt={3}>
                            {props.children}
                        </Typography>
                    );
                },
                br() {
                    return <Divider sx={{ my: 1, visibility: 'hidden' }} />;
                },
                hr() {
                    return <Divider sx={{ my: 2 }} />;
                },
                img(props) {
                    return (
                        <Box
                            component="img"
                            sx={{ maxWidth: '100%' }}
                            alt={props.alt}
                            src={props.src}
                        />
                    );
                },
                li(props) {
                    return (
                        <ListItem sx={{ display: 'list-item', pl: 2, py: 0.1 }}>
                            <ListItemText>{props.children}</ListItemText>
                        </ListItem>
                    );
                },
                ol(props) {
                    return (
                        <List
                            component="ol"
                            sx={{ listStyleType: 'decimal', pl: 4 }}
                        >
                            {props.children}
                        </List>
                    );
                },
                p(props) {
                    return (
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{ my: 1, textAlign: 'justify' }}
                        >
                            {props.children}
                        </Typography>
                    );
                },
                pre(props) {
                    return (
                        <Box
                            component="pre"
                            sx={{
                                padding: 2,
                                borderRadius: '4px',
                                overflowX: 'auto',
                                backgroundColor: (theme) =>
                                    theme.palette.background.default,
                            }}
                        >
                            {props.children}
                        </Box>
                    );
                },
                strong(props) {
                    return (
                        <Typography
                            component="strong"
                            sx={{ fontWeight: 'bold' }}
                        >
                            {props.children}
                        </Typography>
                    );
                },
                ul(props) {
                    return (
                        <List
                            component="ul"
                            sx={{ listStyleType: 'disc', pl: 4 }}
                        >
                            {props.children}
                        </List>
                    );
                },
                del(props) {
                    return (
                        <Typography
                            component="del"
                            sx={{
                                textDecoration: 'line-through',
                            }}
                        >
                            {props.children}
                        </Typography>
                    );
                },
                table(props) {
                    return (
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
                                {props.children}
                            </Table>
                        </Box>
                    );
                },
                thead(props) {
                    return <TableHead>{props.children}</TableHead>;
                },
                tbody(props) {
                    return <TableBody>{props.children}</TableBody>;
                },
                tr(props) {
                    return (
                        <TableRow
                            sx={{
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            {props.children}
                        </TableRow>
                    );
                },
                th(props) {
                    return (
                        <TableCell
                            sx={{
                                textAlign: 'left',
                                padding: '8px',
                                borderBottom: '1px solid',
                                borderRight: '1px solid',
                                borderColor: 'divider',
                                backgroundColor: 'background.default',
                                fontWeight: 'bold',
                                minWidth: '120px',
                            }}
                        >
                            {props.children}
                        </TableCell>
                    );
                },
                td(props) {
                    return (
                        <TableCell
                            sx={{
                                textAlign: 'left',
                                padding: '8px',
                                borderBottom: '1px solid',
                                borderRight: '1px solid',
                                borderColor: 'divider',
                                minWidth: '120px',
                            }}
                        >
                            {props.children}
                        </TableCell>
                    );
                },
            }}
        >
            {markdown}
        </Markdown>
    );
};

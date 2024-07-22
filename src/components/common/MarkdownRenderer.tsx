import React from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    Typography,
    Box,
    Divider,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';

type MarkdownRendererProps = {
    markdown: string;
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
    markdown,
}) => {
    return (
        <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
                a(props) {
                    return (
                        <Link to={props.href ?? ''} color="info.main">
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
                        <ListItem sx={{ display: 'list-item', pl: 2 }}>
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
            }}
        >
            {markdown}
        </Markdown>
    );
};

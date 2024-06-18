import React from 'react';

interface FlexHeightContainerProps {
    header?: React.ReactElement;
    content: React.ReactElement<{ height: string }>;
    footer?: React.ReactElement;
}

const MAIN_PADDING_HEIGHT = 160;

export const FlexHeightContainer: React.FC<FlexHeightContainerProps> = ({
    header,
    content,
    footer,
}) => {
    const headerRef = React.useRef<HTMLDivElement>(null);
    const footerRef = React.useRef<HTMLDivElement>(null);
    const [headerHeight, setHeaderHeight] = React.useState(0);
    const [footerHeight, setFooterHeight] = React.useState(0);

    React.useLayoutEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.clientHeight);
        }
        if (footerRef.current) {
            setFooterHeight(footerRef.current.clientHeight);
        }
    }, [header, footer]);

    const height = `calc(100dvh - ${MAIN_PADDING_HEIGHT}px - ${headerHeight}px - ${footerHeight}px)`;

    const clonedHeader = header
        ? React.cloneElement(header, { ref: headerRef })
        : null;
    const clonedContent = React.cloneElement(content, { height });
    const clonedFooter = footer
        ? React.cloneElement(footer, { ref: footerRef })
        : null;

    return (
        <>
            {clonedHeader}
            {clonedContent}
            {clonedFooter}
        </>
    );
};

import React from 'react';

interface FlexHeightContainerProps {
    header: React.ReactElement;
    content: React.ReactElement<{ maxHeight: string }>;
}

const FOOTER_HEIGHT = 100;

export const FlexHeightContainer: React.FC<FlexHeightContainerProps> = ({
    header,
    content,
}) => {
    const headerRef = React.useRef<HTMLDivElement>(null);
    const [headerHeight, setHeaderHeight] = React.useState(0);

    const maxHeight = `calc(100vh - ${FOOTER_HEIGHT}px - ${headerHeight}px)`;

    React.useLayoutEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.clientHeight);
        }
    }, []);

    const clonedHeader = React.cloneElement(header, { ref: headerRef });
    const clonedContent = React.cloneElement(content, { maxHeight });

    return (
        <>
            {clonedHeader}
            {clonedContent}
        </>
    );
};

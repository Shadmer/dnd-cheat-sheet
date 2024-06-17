import { useParams } from 'react-router-dom';

export const EntryPage = () => {
    const params = useParams();
    return (
        <>
            <h2>{params.id}</h2>
        </>
    );
};

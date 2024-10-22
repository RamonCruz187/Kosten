import {useParams} from "react-router-dom";

export const PackageFullView = () => {

    const params = useParams();

    return (
        <div>
            <h1>Paquete { params.id }</h1>
        </div>
    );
}
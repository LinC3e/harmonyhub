import { useEffect, useState } from "react";

function useFetch(
    url,
    options = {}
) {
    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setData(null);
        setIsError(false);
        setIsLoading(true);

        fetch(url, { ...options })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error("Error al relizar la petición");
            })
            .then((data) => {
                setData(data);
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [options, url]);

    return [data, isError, isLoading];
}

export default useFetch;
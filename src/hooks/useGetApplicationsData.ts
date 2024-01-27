import { useEffect, useRef, useState } from "react";
import { API_URL, DATA_LIMIT } from "../utilities/constants";
import { AsyncStatus } from "../utilities/types";


export const useGetApplicationsData = (pageNumber = 1) => {

    const cacheRef = useRef({});
    const [status, setStatus] = useState<AsyncStatus | undefined>();
    const [data, setData] = useState([]);

    const fetchData = async () => {
        setStatus(AsyncStatus.InProgress);

        const apiUrl = `${API_URL}?_page=${pageNumber}&_limit=${DATA_LIMIT}`;
        if(cacheRef.current[apiUrl]){
            const data = cacheRef.current[apiUrl];
            setData(data);
            setStatus(AsyncStatus.Success);
        }else{
            const apiResponse = await fetch(apiUrl)
                .then(data => data.json())
                .catch(err => setStatus(AsyncStatus.Error));
            const newData = [...data, ...apiResponse];
            cacheRef.current[apiUrl] = newData;
            setData(newData);
            setStatus(AsyncStatus.Success);
        }
    }

    useEffect(() => {
        fetchData();
    }, [pageNumber]);

    return { status, data };
}
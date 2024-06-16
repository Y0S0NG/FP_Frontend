import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Result() {
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const response = await axios.get('/api/results/me/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setResult(response.data);
            } catch (error) {
                console.error('Error fetching result', error);
            }
        };
        fetchResult();
    }, []);

    if (!result) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Your Result</h2>
            <p>Group: {result.group}</p>
            <p>Manually Adjusted: {result.manually_adjusted ? 'Yes' : 'No'}</p>
        </div>
    );
}

export default Result;

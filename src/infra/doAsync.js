import axios from 'axios';

const doAsync = ({
    url,
    method = 'get',
    body,
    dispatch,
}) => {

    if (!url) {
        throw new Error('URL is required');
    }

    // if (Boolean(busyIndicationName)) {
    //     dispatch(incrementBusyIndicator(busyIndicationName));
    // }

    const makeRequest = async () => {
        return await axios({
            method,
            url,
            data: body,
        })
            .then((res) => {
                // if (Boolean(busyIndicationName)) {
                //     dispatch(decrementBusyIndicator(busyIndicationName));
                // }

                return res.data;
            })
            .catch((error) => console.log(`Unable to make API call for ${url}`, error));
    };

    return makeRequest();
};

export { doAsync };
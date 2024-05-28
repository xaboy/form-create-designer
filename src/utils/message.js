import {ElMessage} from 'element-plus';

const errorMessage = (msg) => {
    return ElMessage({
        message: msg,
        type: 'error',
        customClass: '_fc-message-error',
    });

};

export default errorMessage;
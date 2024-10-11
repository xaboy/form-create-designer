import {ElMessage} from 'element-plus';


const message = (msg, type) => {
    return ElMessage({
        message: msg,
        type: type || 'info',
        customClass: '_fc-message-tip',
    });
};

const errorMessage = (msg) => {
    return message(msg, 'error');

};

export default errorMessage;

export {message}
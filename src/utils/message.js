import {Message} from 'element-ui';

const message = (msg, type) => {
    return Message({
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

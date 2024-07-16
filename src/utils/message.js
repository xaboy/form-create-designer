import {Message} from 'element-ui';

const errorMessage = (msg) => {
    return Message({
        message: msg,
        type: 'error',
        customClass: '_fc-message-error',
    });

};

export default errorMessage;

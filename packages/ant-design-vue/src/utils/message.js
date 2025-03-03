import {message as AMessage} from 'ant-design-vue';


const message = (msg, type) => {
    return AMessage[type || 'info']({
        content: msg,
    });
};

const errorMessage = (msg) => {
    return message(msg, 'error');

};

export default errorMessage;

export {message}
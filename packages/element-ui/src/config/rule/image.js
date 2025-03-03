import {localeProps} from '../../utils';

const label = '图片';
const name = 'elImage';

export default {
    menu: 'aide',
    icon: 'icon-image',
    label,
    name,
    rule() {
        return {
            type: name,
            title: '',
            style: {
                width: '100px',
                height: '100px',
            },
            props: {
                src: 'https://static.form-create.com/example.png',
            }
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [
            {
                type: 'input',
                field: 'src',
            }
        ]);
    }
};
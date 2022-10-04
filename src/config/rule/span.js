const label = '文字';
const name = 'span';

export default {
    icon: 'icon-span',
    label,
    name,
    rule() {
        return {
            type: name,
            title: '文字',
            native: false,
            children: ['这是一段文字'],
        };
    },
    props() {
        return [
            {
                type: 'input',
                field: 'formCreateTitle',
                title: 'title',
            },
            {
                type: 'input',
                field: 'formCreateChild',
                title: '内容',
                props: {
                    type: 'textarea'
                }
            }
        ];
    }
};
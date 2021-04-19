<template>
    <div class="_fc_fetch">
        <form-create v-model="api" :value="value || {}" :rule="rule" :option="option" @change="input"/>
    </div>
</template>

<script>

export default {
    name: 'Fetch',
    props: {
        value: Object,
        to: String,
        formCreate: Object,
        formCreateField: Object,
    },
    data() {
        return {
            api:{},
            fetch:{},
            option:{
                form:{labelPosition: 'right',
                size: 'mini',
                labelWidth: '70px'},
                submitBtn:false,
            },
            rule:[
                {
                    type:'input',
                    field: 'action',
                    title: '接口: ',
                    validate:[{required:true,message:'请数据接口'}]
                },
                {
                    type:'input',
                    field: 'method',
                    title: '请求方式: ',
                    value:'GET',
                },
                {
                    type:'input',
                    field: '_parse',
                    title: '解析函数',
                    value:'',
                    props:{
                        type:'textarea',
                        rows: 10,
                    },
                    validate:[{validator:(_,v,cb)=>{
                      if(!v) return cb();
                      try{
                          this.parseFn(v);
                      }catch (e){
                          return cb(false);
                      }
                      cb();
                    },message: '请数据正确的解析函数'}]
                },
            ]
        };
    },
    methods: {
        parseFn(v){
          return eval('(function(){return ' + v + ' })()');
        },
        input(){
          this.api.submit((formData)=>{
              formData.to = this.to || 'options';
              if(formData._parse) formData.parse = this.parseFn(formData._parse);
              this.$emit('input',formData);
          });
        },
    },
    beforeDestroy() {
      this.formCreate.
      this.$emit('input','');
    }
};
</script>
<style>
._fc_fetch .el-form-item__label {
  float: left;
  display: inline-block;
  text-align: right;
  padding-right: 5px;
}
._fc_fetch{
  background-color: #bfdaf7;
  padding: 10px;
}
</style>
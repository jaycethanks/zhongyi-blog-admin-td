import { Form, Input, Modal, Switch } from 'antd';
import React, { useEffect } from 'react';

import type { FormInstance } from 'antd/es/form';

interface NewColumnModalProps {
  open: boolean;
  type: 'add' | 'edit';
  onValidateFinish: (values: any) => void;
  onModalClose: any;
  initialValues?: API.Tag;
}

const NewTagModal: React.FC<NewColumnModalProps> = ({
  type,
  open,
  onValidateFinish,
  onModalClose,
  initialValues,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    // 值的回显
    console.log('[initialValues]: ', initialValues);
    if (initialValues === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);
  const onFinishFailed = () => {
    console.warn('modal validate failed');
  };
  const onModalOk = (form: FormInstance) => {
    form.validateFields();
    form.submit(); // 将会触发 onFinish
  };
  return (
    <>
      <Modal
        transitionName=''
        maskTransitionName=''
        title={type === 'add' ? '新建标签' : '编辑标签'}
        centered
        open={open}
        okText={type === 'add' ? '确定' : '更新'}
        onOk={() => onModalOk(form)}
        onCancel={() => onModalClose()}
        width={'40rem'}
      >
        <Form
          form={form}
          name='basic'
          initialValues={{
            visible: true,
          }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={(values) =>
            onValidateFinish({ tagid: initialValues?.tagid, ...values })
          }
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='标签名称'
            name='name'
            rules={[{ required: true, message: '标签名称未填写' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='是否可见'
            name='visible'
            valuePropName='checked'
            rules={[{ required: false }]}
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NewTagModal;

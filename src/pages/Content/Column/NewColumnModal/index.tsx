import { Form, Input, Modal, Switch } from 'antd';
import React, { useEffect } from 'react';

import FormItemUpload from '@/components/FormItemUpload';

const { TextArea } = Input;
import type { FormInstance } from 'antd/es/form';

interface NewColumnModalProps {
  open: boolean;
  type: 'add' | 'edit';
  onValidateFinish: (values: any) => void;
  onModalClose: any;
  initialValues?: API.Column;
}

const NewColumnModal: React.FC<NewColumnModalProps> = ({
  type,
  open,
  onValidateFinish,
  onModalClose,
  initialValues,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
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
        title={type === 'add' ? '新建专栏' : '编辑专栏'}
        centered
        open={open}
        okText={type === 'add' ? '确定' : '更新'}
        onOk={() => onModalOk(form)}
        onCancel={() => onModalClose()}
        width={'40rem'}
      >
        <Form
          initialValues={{
            visible: true,
          }}
          form={form}
          name='basic'
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={(values) =>
            onValidateFinish({ colid: initialValues?.colid, ...values })
          }
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='专栏名称'
            name='name'
            rules={[{ required: true, message: '专栏名称未填写' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='专栏简介'
            name='description'
            rules={[{ required: true, message: '专栏简介未填写' }]}
          >
            <TextArea
              rows={2}
              maxLength={100}
              showCount
              autoSize={{ minRows: 2, maxRows: 2 }}
            />
          </Form.Item>

          <Form.Item
            label='文章封面'
            name='cover'
            rules={[{ required: false }]}
          >
            <FormItemUpload />
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

export default NewColumnModal;

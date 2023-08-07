import { Form, Input, Modal, Switch } from 'antd';
import React, { useEffect } from 'react';

const { TextArea } = Input;
import type { FormInstance } from 'antd/es/form';

interface NewCateModalProps {
  open: boolean;
  type: 'add' | 'edit';
  onValidateFinish: (values: any) => void;
  onModalClose: any;
  initialValues?: API.Category;
}

const NewTagModal: React.FC<NewCateModalProps> = ({
  type,
  open,
  onValidateFinish,
  onModalClose,
  initialValues,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    // 值的回显
    if (initialValues === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);
  const onFinishFailed = () => {
    console.warn('modal validate failed');
  };
  const onModalOk = async (form: FormInstance) => {
    await form.validateFields();
    form.submit(); // 将会触发 onFinish
  };
  return (
    <>
      <Modal
        transitionName=''
        maskTransitionName=''
        title={type === 'add' ? '新建分类' : '编辑分类'}
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
          initialValues={{ visible: true }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={(values) =>
            onValidateFinish({ catid: initialValues?.catid, ...values })
          }
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='分类名称'
            name='name'
            rules={[{ required: true, message: '分类名称未填写' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='分类描述'
            name='description'
            rules={[{ required: true, message: '分类描述未填写' }]}
          >
            <TextArea
              rows={2}
              maxLength={30}
              showCount
              autoSize={{ minRows: 2, maxRows: 2 }}
            />
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

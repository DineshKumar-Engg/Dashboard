import React, { useEffect, useState } from 'react'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import Page from '../../../layout/Page/Page'
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card'
import { Field,Formik } from 'formik'
import { SponsorPageConfig, SponsorPageData, VendorPageConfig, VendorPageData, errorMessage, loadingStatus, successMessage } from '../../../redux/Slice'
import { useDispatch, useSelector } from 'react-redux'
import FormGroup from '../../../components/bootstrap/forms/FormGroup'
import Button from '../../../components/bootstrap/Button'
import { Col, Row } from 'react-bootstrap'
import Label from '../../../components/bootstrap/forms/Label'
import Spinner from '../../../components/bootstrap/Spinner'
import Popovers from '../../../components/bootstrap/Popovers'
import { useNavigate, useParams } from 'react-router-dom'
import showNotification from '../../../components/extras/showNotification'
import Icon from '../../../components/icon/Icon'
import JoditEditor from 'jodit-react';

const VendorPage = () => {
const { id } = useParams()
const { token, VendorTemplateData, Loading, error, success } = useSelector((state) => state.festiv)
const dispatch = useDispatch()
const navigate = useNavigate()

const [isLoading, setIsLoading] = useState(false);

const joditToolbarConfig = {
    buttons: ['bold', 'italic', 'underline', 'ul', 'ol', 'indent', 'outdent', 'link', 'paragraph', 'brush', 'fontsize', 'underline'],
};

useEffect(() => {
    dispatch(VendorPageData({ id, token }))
}, [token])

const imageUrl = VendorTemplateData?.vendorBannerImage

const handleSave = (val) => {
    setIsLoading(false);
    showNotification(
        <span className='d-flex align-items-center'>
            <Icon icon='Info' size='lg' className='me-1' />
            <span className='fs-6'>{val}</span>
        </span>,

    );
    if (success == "Admin Vendor Page updated successfully") {
        navigate('../template/pageList')
    }
    dispatch(errorMessage({ errors: '' }))
    dispatch(successMessage({ successess: '' }))
    dispatch(loadingStatus({ loadingStatus: false }))
};

const [initialValues, setInitialValues] = useState({
    vendorBannerImage: '',
    description: ''
})

useEffect(() => {
    error && handleSave(error)
    success && handleSave(success)
    if (Loading) {
        setIsLoading(true)
    }
    else {
        setIsLoading(false)
    }
}, [error, success, Loading]);


const validateImageSize = (file, minWidth, maxWidth, minHeight, maxHeight) => {
    const image = new Image();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onload = (e) => {
            image.onload = () => {
                const { width, height } = image;
                console.log(file, width, height);
                if (
                    width >= minWidth &&
                    width <= maxWidth &&
                    height >= minHeight &&
                    height <= maxHeight
                ) {

                    resolve();
                } else {
                    reject(`Invalid image resolution`);
                }
            };
            image.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
};


useEffect(() => {
    setInitialValues((prevState) => ({ ...prevState, description: VendorTemplateData?.description }))
}, [VendorTemplateData])


const OnSubmit = async (values) => {
    console.log(values)
    setIsLoading(true)
    dispatch(VendorPageConfig({ token, id, values }))
};


  return (
    <PageWrapper>
    <Page>
        <Card>
            <CardHeader>
                <CardLabel icon='storefront' iconColor='success' size='4x'>
                    <CardTitle>Vendor page</CardTitle>
                </CardLabel>
            </CardHeader>
            <CardBody>
                <div className='container'>
                    <Formik initialValues={initialValues} onSubmit={(values, { resetForm }) => { OnSubmit(values, resetForm) }} enableReinitialize={true}>
                        {({ values, handleSubmit, handleChange, setFieldValue, handleBlur, resetForm }) => (
                            <form onSubmit={handleSubmit}>
                                <Row className="d-flex justify-content-center align-items-center">
                                    <Col lg={12}>
                                        <div className="col-lg-12 d-flex justify-content-center align-items-center flex-column upload-btn-wrapper">
                                            <div>
                                                <Label className='h5'>Banner Image</Label>
                                                <Popovers title='Alert !' trigger='hover' desc='Banner Image should be width 1900 to 2000 and height 500 to 600' isDisplayInline="true">
                                                    <Button icon='Error'></Button>
                                                </Popovers>
                                            </div>
                                            <Field name="vendorBannerImage">
                                                {({ field, form }) => (
                                                    <>
                                                        <Row className='imageBanner'>
                                                            <Col lg={6} >
                                                                <div className="bannerBgImageMain">
                                                                    <img src={imageUrl} className="bannerBgImage" width={250} height={100} ></img>
                                                                    <div className="black"></div>
                                                                    <div className="bannerBgoverlay">
                                                                        Live Image
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col lg={6}>
                                                                {field.value && <img src={URL.createObjectURL(field.value)} alt="Logo Image" width={250} height={100} />}
                                                            </Col>
                                                        </Row>

                                                        <div className='d-flex justify-content-end mb-2 mt-2'>
                                                            <button type='button' className="Imgbtn">+</button>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(event) => {
                                                                    const file = event.target.files[0];
                                                                    form.setFieldValue(field.name, file);
                                                                    validateImageSize(file, 1900, 2000, 500, 600)
                                                                        .then(() => {
                                                                            form.setFieldError(field.name, '');
                                                                        })
                                                                        .catch((error) => {
                                                                            form.setFieldError(field.name, error);
                                                                            form.setFieldValue(field.name, '');
                                                                        })
                                                                }}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                            </Field>
                                        </div>
                                    </Col>
                                    <Col lg={10}>
                                    <FormGroup >
                                    <Label className='fw-bold fs-5'>Vendor Description</Label>

                                            <JoditEditor
                                                value={values.description}
                                                placeholder="Description"
                                                config={joditToolbarConfig}
                                                onChange={(content) => values.description = content}
                                                onBlur={handleBlur}
                                                name={values.description}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <div className='text-end mt-4'>
                                            <Button
                                                size='lg'
                                                className='w-20 '
                                                icon={isLoading ? undefined : 'Save'}
                                                isDark
                                                color={isLoading ? 'success' : 'info'}
                                                isDisable={isLoading}
                                                type='submit'
                                            >
                                                {isLoading && <Spinner isSmall inButton />}
                                                Save
                                            </Button>
                              </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </CardBody>
        </Card>
    </Page>
</PageWrapper>
  )
}

export default VendorPage
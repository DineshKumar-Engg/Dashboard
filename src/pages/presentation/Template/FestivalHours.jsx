import React, { useEffect, useState } from 'react'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import Page from '../../../layout/Page/Page'
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card'
import { Field, Formik } from 'formik'
import { FestivPageConfig, FestivPageData, errorMessage, loadingStatus, successMessage } from '../../../redux/Slice'
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
import Swal from 'sweetalert2'
import { errTitle, scc, poscent, posTop, errIcon, sccIcon,BtnCanCel,BtnGreat } from '../Constant';
import { clearErrors, clearSuccesses, setLoadingStatus } from '../../../redux/Action'


const FestivalHours = () => {

    const { id } = useParams()
    const { token, FestivTemplateData, Loading, error, success } = useSelector((state) => state.festiv)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);

    const joditToolbarConfig = {
        "useSearch": false,
        "toolbarButtonSize": "small",
        "enter": "P",
        "toolbarAdaptive": false,
        "toolbarSticky": false,
        "showCharsCounter": false,
        "showWordsCounter": false,
        "showXPathInStatusbar": false,
        "buttons": "bold,italic,underline,align,ul,ol,fontsize,paragraph,brush,lineHeight,spellcheck,cut,copy,paste,selectall,link,symbols,indent,outdent"
    }
    useEffect(() => {
        dispatch(FestivPageData({ id, token }))
    }, [token])

    const imageUrl = FestivTemplateData?.festivalHoursBannerImage



    const Notification = (val,tit,pos,ico,btn) => {
		Swal.fire({
			position:`${pos}`,
			title: `${tit}`,
			text: `${val}`,
			icon: `${ico}`,
			confirmButtonText: `${btn}`,
			timer: 3000
		})
		if (success == "festivalHoursPage updated successfully") {
			navigate(-1)
		}
		clearErrors(); 
		clearSuccesses(); 
		setLoadingStatus(false); 
	}

    const [initialValues, setInitialValues] = useState({
        festivalHoursBannerImage: '',
        description: ''
    })

	useEffect(() => {
		error && Notification(error,errTitle,poscent,errIcon,BtnCanCel)
		success && Notification(success,scc,posTop,sccIcon,BtnGreat)
		Loading ? setIsLoading(true) : setIsLoading(false)
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
        setInitialValues((prevState) => ({ ...prevState, description: FestivTemplateData?.description }))
    }, [FestivTemplateData])


    const OnSubmit = async (values) => {
        console.log(values)
        setIsLoading(true)
        dispatch(FestivPageConfig({ token, id, values }))

    };




    return (
        <PageWrapper>
            <Page>
                <Card>
                    <CardHeader>
                        <CardLabel icon='AcUnit' iconColor='success' size='4x'>
                            <CardTitle>Festival Hours </CardTitle>
                        </CardLabel>
                    </CardHeader>
                    <CardBody>
                        {
                            Loading &&
                            <div className='d-flex justify-content-center align-items-center w-100'>
                                <Spinner />
                            </div> || (
                                <div className='container'>
                                    <Formik initialValues={initialValues} onSubmit={(values, { resetForm }) => { OnSubmit(values, resetForm) }} enableReinitialize={true}>
                                        {({ values, handleSubmit, handleChange, setFieldValue, handleBlur, resetForm }) => (
                                            <form onSubmit={handleSubmit}>
                                                <Row className="d-flex justify-content-center align-items-center">
                                                    <Col lg={12}>
                                                        <div className="col-lg-12 d-flex justify-content-center align-items-center flex-column upload-btn-wrapper">
                                                            <div>
                                                                <h3 className='fw-bold  text-center mb-3'>Banner Image
                                                                    <Popovers title='Alert !' trigger='hover' desc='Banner Image should be width 1900 to 2000 and height 500 to 600' isDisplayInline="true">
                                                                        <Button icon='Error'></Button>
                                                                    </Popovers>
                                                                </h3>
                                                            </div>
                                                            <Field name="festivalHoursBannerImage">
                                                                {({ field, form }) => (
                                                                    <>
                                                                        <Row className='imageBanner'>
                                                                            <Col lg={6} >
                                                                                <div className="bannerBgImageMain">
                                                                                    <img src={imageUrl} className="bannerBgImage" ></img>
                                                                                    <div className="black"></div>
                                                                                    <div className="bannerBgoverlay">
                                                                                        <h4> Live Image</h4>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                            <Col lg={6}>
                                                                                {field.value && (
                                                                                    <div className='d-flex '>
                                                                                        <div className="bannerBgImageMain">
                                                                                            <div className='d-flex align-items-start justify-content-center'>
                                                                                                <img src={URL.createObjectURL(field.value)} alt="Logo Image" />
                                                                                            </div>
                                                                                            <div className="black"></div>
                                                                                            <div className="bannerBgoverlay">
                                                                                                <h4>New Image</h4>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='cancelImageBtnEvent'>
                                                                                            <Button icon='Cancel' isLight color='danger' onClick={() => { setFieldValue('festivalHoursBannerImage', '') }}></Button>

                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                                }
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
                                                    <Col lg={10} className='my-5'>
                                                        <FormGroup >
                                                            <h3 className='fw-bold text-center mb-3'>Festival Hours Description</h3>
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
                                                        Save & Close
                                                    </Button>
                                                    <Button
                                                        className='w-20 py-3 px-3 my-3 mx-3'
                                                        color={'danger'}
                                                        isLight
                                                        shadow='default'
                                                        hoverShadow='none'
                                                        icon='Cancel'
                                                        onClick={() => {
                                                            resetForm()
                                                            navigate('../template/pageList')
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </form>
                                        )}
                                    </Formik>
                                </div>
                            )
                        }
                    </CardBody>
                </Card>
            </Page>
        </PageWrapper>
    )
}

export default FestivalHours
import React, { FC, useState, useEffect, useRef } from 'react';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import useMinimizeAside from '../../../hooks/useMinimizeAside';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
// import CommonTransActions from '../../_common/CommonTransActions';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../../components/bootstrap/Modal';
import Input from '../../../components/bootstrap/forms/Input';
import Wizard, { WizardItem } from '../../../components/Wizard';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Label from '../../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import Card, {
  CardBody,
  CardHeader,
  CardLabel,
  CardTitle,
} from '../../../components/bootstrap/Card';
import Select from 'react-select';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import { demoPagesMenu } from '../../../menu';
import useDarkMode from '../../../hooks/useDarkMode';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, FieldArray, useFormikContext, useFormik } from 'formik';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import { useDispatch, useSelector } from 'react-redux';
import { AssignEventName, AssignTicketName, HomeDataList, errorMessage, getAssignedList, homeData, loadingStatus, successMessage } from '../../../redux/Slice';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Popovers from '../../../components/bootstrap/Popovers';
import Spinner from '../../../components/bootstrap/Spinner';
// import { Editor } from '@editorjs/editorjs';
// import EditorJSColorSize from './EditorJSColorSize';
import JoditEditor from 'jodit-react';
import { Jodit } from 'jodit-react';
import { Col, Row } from 'react-bootstrap';




const Drafts = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const { error, Loading, success, token, AssignLists, HomeDataAutoList } = useSelector((state) => state.festiv)

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

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(HomeDataList({ id, token }))
  }, [])

  useEffect(() => {
    dispatch(getAssignedList(token))
  }, [id, token])





  const [initialValues, setInitialValues] = useState({
    templatePageId: id,
    navbarImage: '',
    bannerImage1: '',
    bannerImage2: '',
    bannerImage3: '',
    bannerImage4: '',
    bannerImage5: '',
    joinUs: '',
    festivalHighlightsTitle: '',
    festivalHighlightsEvents: [],
    festivalFunImage: '',
    festivalTitle: '',
    festivalDescription: '',
    aboutUs: '',
    sponsorship: '',
    vendors: '',
    festivalHours: '',
    events: '',
    gallery: '',
    youtubeLink: '',
    instagramLink: '',
    locationName: '',
    latitude: '',
    longitude: '',
    contactPhoneNo: '',
    contactAddress: '',
    contactAdminEnquiryEmail: '',
    sponsorImages: [],
  })

  const validationSchema = Yup.object().shape({
    contactPhoneNo: Yup.string()
      .required('Phone number is required')
      .matches(/^\d+$/, 'Phone number must be a number')
      .max(12, 'Phone number cannot be longer than 12 digits'),
    contactAdminEnquiryEmail: Yup.string()
      .required('Email is required')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email address'
      ),
  });
  const filteredAssign = HomeDataAutoList?.festivalHighlightsEvents?.map(({ eventId, eventName }) => ({
    label: eventName,
    value: eventId
  }))

  useEffect(() => {

    // console.log("HomeDataAutoList11", HomeDataAutoList?.festivalHighlightsEvents);

    setInitialValues((prevState) => ({
      ...prevState,
      joinUs: HomeDataAutoList.joinUs,
      festivalHighlightsTitle: HomeDataAutoList.festivalHighlightsTitle,
      festivalHighlightsEvents: filteredAssign?.map(item => item.value),
      festivalTitle: HomeDataAutoList.festivalTitle,
      festivalDescription: HomeDataAutoList.festivalDescription,
      youtubeLink: HomeDataAutoList.youtubeLink,
      // instagramLink: HomeDataAutoList.instagramLink,
      locationName: HomeDataAutoList.locationName,
      latitude: HomeDataAutoList.latitude,
      longitude: HomeDataAutoList.longitude,
      contactPhoneNo: HomeDataAutoList.contactPhoneNo,
      contactAdminEnquiryEmail: HomeDataAutoList.contactAdminEnquiryEmail,
    }))

  }, [HomeDataAutoList])




  // const handleMapClick = (e) => {
  //   const { latLng } = e;
  //   const latitude = latLng.lat();
  //   const longitude = latLng.lng();
  //   setCenter({ lat: latitude, lng: longitude });
  //   setMarkers({ lat: latitude, lng: longitude });
  // };

  const [isLoading, setIsLoading] = useState(false);

  // const mapStyles = {
  //   height: '250px',
  //   width: '100%',
  // };
  const lib = ['places'];
  // const searchBoxRef = useRef()

  const handleSave = (val) => {
    setIsLoading(false);
    showNotification(
      <span className='d-flex align-items-center'>
        <Icon icon='Info' size='lg' className='me-1' />
        <span className='fs-6'>{val}</span>
      </span>,

    );
    if (success == "Home Page updated successfully") {
      navigate('../template/pageList')
    }
    dispatch(errorMessage({ errors: '' }))
    dispatch(successMessage({ successess: '' }))
    dispatch(loadingStatus({ loadingStatus: false }))
  };


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


  // const [map, setMap] = React.useState(null);
  const [searchBox, setSearchBox] = React.useState(null);
  // const [center, setCenter] = React.useState({ lat: 39.833851, lng: -74.871826 });
  // const [markers, setMarkers] = React.useState({ lat: 39.833851, lng: -74.871826 });


  const onSBLoad = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = (setFieldValue) => {
    const place = searchBox.getPlaces()[0];
    const addressName = place.formatted_address;
    setFieldValue('locationName', addressName)
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();
    setFieldValue('latitude', latitude)
    setFieldValue('longitude', longitude)

    setCenter({ lat: latitude, lng: longitude });
    setMarkers({ lat: latitude, lng: longitude });

  };







  const filteredEvent = AssignLists.map((item) => ({
    label: item?.event?.eventName,
    value: item?.event?.eventId,
  }));


  const validateImageSize = (file, minWidth, maxWidth, minHeight, maxHeight) => {
    const image = new Image();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        image.onload = () => {
          const { width, height } = image;
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

  const handleSubmit = async (values, { resetForm }) => {



    const formData = new FormData();
    for (let value in values) {
      if (value != 'sponsorImages')
        formData.append(value, values[value]);
    }
    values.sponsorImages.forEach((image, index) => {
      formData.append('sponsorImages', image);
    });

    console.log(values);


    dispatch(homeData({ formData, token, id }))
    setIsLoading(true);
  };

  const generateKey = (label, value) => `${label}-${value}`;

  return (
    <PageWrapper>
      <Page>
        <Card>
          <CardHeader>
            <CardLabel icon='Home' iconColor='success'>
              <CardTitle>Home Page</CardTitle>
            </CardLabel>
          </CardHeader>
          <CardBody>

            <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true} validationSchema={validationSchema}>
              {({ values, handleSubmit, handleChange, touched, errors, setFieldValue, handleBlur, resetForm }) => (
                <form onSubmit={handleSubmit}>
                  <div className="row d-flex  mb-4 mt-5">
                    <div className="col-lg-12  text-center flex-column upload-btn-wrapper heightCol">
                      <div>
                        <Label className='h5'>Logo Image</Label>
                        <Popovers title='Alert !' trigger='hover' desc='Logo Image should be width 300 to 500 and height 170 to 200' isDisplayInline={"true"}>
                          <Button icon='Error'></Button>
                        </Popovers>
                      </div>
                      <Row className='imageBanner d-flex justify-content-center align-items-center mb-3'>
                        <Col lg={2} >
                          <div className="bannerBgImageMain">
                            <img src={HomeDataAutoList?.navbarImage} className="bannerBgImage" width={200} height={90} ></img>
                            <div className="black"></div>
                            <div className="bannerBgoverlay">
                              Live Image
                            </div>
                          </div>
                        </Col>

                      </Row>
                      <Field name="navbarImage">
                        {({ field, form }) => (
                          <>

                            <Row className='imageBanner d-flex justify-content-center align-items-center'>
                              <Col lg={6}>
                                {field.value && (
                                  <div className='d-flex align-items-start justify-content-center'>
                                    <img src={URL.createObjectURL(field.value)} alt="Logo Image" width={200} height={100} />
                                    <Button icon='Cancel' size='1x' color='danger' isLight onClick={() => { setFieldValue('navbarImage', '') }}></Button>
                                  </div>
                                )
                                }
                              </Col>
                            </Row>
                            {/* <div className='d-flex justify-content-center mb-2'>
                              {field.value && <img src={URL.createObjectURL(field.value)} alt="Logo Image" width={130} height={90} />}
                            </div> */}
                            <div className='d-flex justify-content-center mb-2'>
                              <button type='button' className="Imgbtn">+</button>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                  const file = event.target.files[0];
                                  form.setFieldValue(field.name, file);
                                  validateImageSize(file, 300, 500, 170, 200)
                                    .then(() => {
                                      form.setFieldError(field.name, '');
                                    })
                                    .catch((error) => {
                                      form.setFieldError(field.name, error);
                                      form.setFieldValue(field.name, '');
                                      // Clear the field value if validation fails
                                    })
                                }}
                              />
                            </div>
                          </>
                        )}
                      </Field>
                    </div>
                    <div className="col-lg-12 d-flex justify-content-center text-center flex-column heightCol">
                      <div>
                        <Label className='h5'>Banner Image </Label>
                        <Popovers title='Alert !' trigger='hover' desc='Banner Image should be width 1900 to 2000 and height 500 to 600' isDisplayInline={"true"}>
                          <Button icon='Error'></Button>
                        </Popovers>
                      </div>
                      <Row className='imageBanner d-flex justify-content-between align-items-center pb-5'>
                        <Col lg={2}>
                          <div className="bannerBgImageMain">
                            <img src={HomeDataAutoList?.bannerImage1} className="bannerBgImage" width={80} height={80} ></img>
                            <div className="black"></div>
                            <div className="bannerBgoverlay">
                              Live Image
                            </div>
                          </div>
                        </Col>
                        <Col lg={2}>
                          <div className="bannerBgImageMain">
                            <img src={HomeDataAutoList?.bannerImage2} className="bannerBgImage" width={80} height={80} ></img>
                            <div className="black"></div>
                            <div className="bannerBgoverlay">
                              Live Image
                            </div>
                          </div>
                        </Col>
                        <Col lg={2}>
                          <div className="bannerBgImageMain">
                            <img src={HomeDataAutoList?.bannerImage3} className="bannerBgImage" width={80} height={80} ></img>
                            <div className="black"></div>
                            <div className="bannerBgoverlay">
                              Live Image
                            </div>
                          </div>
                        </Col>
                        <Col lg={2}>
                          <div className="bannerBgImageMain">
                            <img src={HomeDataAutoList?.bannerImage4} className="bannerBgImage" width={80} height={80} ></img>
                            <div className="black"></div>
                            <div className="bannerBgoverlay">
                              Live Image
                            </div>
                          </div>
                        </Col>
                        <Col lg={2}>
                          <div className="bannerBgImageMain">
                            <img src={HomeDataAutoList?.bannerImage5} className="bannerBgImage" width={80} height={80} ></img>
                            <div className="black"></div>
                            <div className="bannerBgoverlay">
                              Live Image
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <div className="row  d-flex justify-content-end text-center">
                        <div className="col d-flex justify-content-start text-center flex-column upload-btn-wrapper">
                          <Field name="bannerImage1">
                            {({ field, form }) => (
                              <>

                                <div className='d-flex justify-content-start mb-2'>
                                  {field.value && (
                                    <div className='d-flex align-items-start justify-content-center'>
                                      <img src={URL.createObjectURL(field.value)} alt="Logo Image" width={200} height={100} />
                                      <Button icon='Cancel' isLight color='danger' className='cancelImageBtn' onClick={() => { setFieldValue('bannerImage1', '') }}></Button>
                                    </div>
                                  )
                                  }
                                </div>
                                <div className='d-flex justify-content-center mb-2'>
                                  <button type='button' class="Imgbtn">+</button>
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
                                          form.setFieldValue(field.name, ''); // Clear the field value if validation fails
                                        })
                                    }}
                                  />
                                </div>
                              </>
                            )}
                          </Field>
                        </div>
                        <div className="col d-flex justify-content-start text-center flex-column upload-btn-wrapper">
                          <Field name="bannerImage2">
                            {({ field, form }) => (
                              <>
                                <div className='d-flex justify-content-start mb-2'>
                                  {field.value && (
                                    <div className='d-flex align-items-start justify-content-center'>
                                      <img src={URL.createObjectURL(field.value)} alt="Logo Image" width={200} height={100} />
                                      <Button icon='Cancel' isLight color='danger' className='cancelImageBtn' onClick={() => { setFieldValue('bannerImage2', '') }}></Button>
                                    </div>
                                  )
                                  }
                                </div>
                                <div className='d-flex justify-content-center mb-2'>
                                  <button type='button' class="Imgbtn">+</button>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                      const file = event.target.files[0];
                                      form.setFieldValue(field.name, file);
                                      validateImageSize(file, 1900, Infinity, 500, Infinity)
                                        .then(() => {
                                          form.setFieldError(field.name, '');
                                        })
                                        .catch((error) => {
                                          form.setFieldError(field.name, error);
                                          form.setFieldValue(field.name, ''); // Clear the field value if validation fails
                                        });
                                    }}
                                  />
                                </div>
                              </>
                            )}
                          </Field>
                        </div>
                        <div className="col d-flex justify-content-start text-center flex-column upload-btn-wrapper">
                          <Field name="bannerImage3">
                            {({ field, form }) => (
                              <>
                                <div className='d-flex justify-content-start mb-2'>
                                  {field.value && (
                                    <div className='d-flex align-items-start justify-content-center'>
                                      <img src={URL.createObjectURL(field.value)} alt="Logo Image" width={200} height={100} />
                                      <Button icon='Cancel' isLight color='danger' className='cancelImageBtn' onClick={() => { setFieldValue('bannerImage3', '') }}></Button>
                                    </div>
                                  )
                                  }
                                </div>
                                <div className='d-flex justify-content-center mb-2'>
                                  <button type='button' class="Imgbtn">+</button>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                      const file = event.target.files[0];
                                      form.setFieldValue(field.name, file);
                                      validateImageSize(file, 1900, Infinity, 500, Infinity)
                                        .then(() => {
                                          form.setFieldError(field.name, '');
                                        })
                                        .catch((error) => {
                                          form.setFieldError(field.name, error);
                                          form.setFieldValue(field.name, ''); // Clear the field value if validation fails
                                        });
                                    }}
                                  />
                                </div>
                              </>
                            )}
                          </Field>
                        </div>
                        <div className="col d-flex justify-content-start text-center flex-column upload-btn-wrapper">
                          <Field name="bannerImage4">
                            {({ field, form }) => (
                              <>
                                <div className='d-flex justify-content-start mb-2'>
                                  {field.value && (
                                    <div className='d-flex align-items-start justify-content-center'>
                                      <img src={URL.createObjectURL(field.value)} alt="Logo Image" width={200} height={100} />
                                      <Button icon='Cancel' isLight color='danger' className='cancelImageBtn' onClick={() => { setFieldValue('bannerImage4', '') }}></Button>
                                    </div>
                                  )
                                  }
                                </div>
                                <div className='d-flex justify-content-center mb-2'>
                                  <button type='button' class="Imgbtn">+</button>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                      const file = event.target.files[0];
                                      form.setFieldValue(field.name, file);
                                      validateImageSize(file, 1900, Infinity, 500, Infinity)
                                        .then(() => {
                                          form.setFieldError(field.name, '');
                                        })
                                        .catch((error) => {
                                          form.setFieldError(field.name, error);
                                          form.setFieldValue(field.name, ''); // Clear the field value if validation fails
                                        });
                                    }}
                                  />
                                </div>
                              </>
                            )}
                          </Field>
                        </div>
                        <div className="col d-flex justify-content-start text-center flex-column upload-btn-wrapper">
                          <Field name="bannerImage5">
                            {({ field, form }) => (
                              <>
                                <div className='d-flex justify-content-start mb-2'>
                                  {field.value && (
                                    <div className='d-flex align-items-start justify-content-center'>
                                      <img src={URL.createObjectURL(field.value)} alt="Logo Image" width={200} height={100} />
                                      <Button icon='Cancel' isLight color='danger' className='cancelImageBtn' onClick={() => { setFieldValue('bannerImage5', '') }}></Button>
                                    </div>
                                  )
                                  }
                                </div>
                                <div className='d-flex justify-content-center mb-2'>
                                  <button type='button' class="Imgbtn">+</button>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                      const file = event.target.files[0];
                                      form.setFieldValue(field.name, file);
                                      validateImageSize(file, 1900, Infinity, 500, Infinity)
                                        .then(() => {
                                          form.setFieldError(field.name, '');
                                        })
                                        .catch((error) => {
                                          form.setFieldError(field.name, error);
                                          form.setFieldValue(field.name, ''); // Clear the field value if validation fails
                                        });
                                    }}
                                  />
                                </div>
                              </>
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row mt-5 mb-5'>
                    <div className="col-lg-12">
                      <Label className='h5 text-center mb-3 w-100'>Banner Announcement</Label>
                      <Field name="joinUs" >
                        {({ field, form }) => (
                          <div>
                            {/* <Textarea {...field} placeholder="Description" rows={1} />
                            {form.touched[field.name] && form.errors[field.name] && (
                              <div style={{ color: 'red' }}>{form.errors[field.name]}</div>
                            )}    */}
                            <JoditEditor
                              value={values.joinUs}
                              {...field}
                              onChange={(content) => setFieldValue('joinUs', content)}
                              config={joditToolbarConfig}
                            />
                          </div>
                        )}
                      </Field>
                    </div>
                    <div className="col-lg-12 mt-5 mb-5">
                      <Label className='h5 text-center mb-3 w-100' htmlFor='festivalHighlightsTitle'>Highlights Title</Label>
                      <Field name="festivalHighlightsTitle">
                        {({ field, form }) => (
                          <>
                            <div>
                              <JoditEditor
                                value={values.festivalHighlightsTitle}
                                {...field}
                                onChange={(content) => setFieldValue('festivalHighlightsTitle', content)}
                                config={joditToolbarConfig}
                              />
                              {/* <Input type="text" {...field} placeholder="Title" /> */}
                            </div>
                            {/* {form.touched[field.name] && form.errors[field.name] && (
                              <div style={{ color: 'red' }}>{form.errors[field.name]}</div>
                            )} */}
                            {/* <EditorJSColorSize
                              initialValue={values.festivalHighlightsTitle}
                              onChange={(content) => {
                                setInitialValues((prevState) => ({
                                  ...prevState,
                                  festivalHighlightsTitle: content,
                                }));
                              }}
                            /> */}

                          </>
                        )}
                      </Field>
                    </div>
                    <div className="col-lg-12">
                      <div className="row  d-flex justify-content-center">
                        <div className="col-lg-12  w-50">
                          <Label className='h5 text-center mb-3 w-100'>Events</Label>
                          <Field name="festivalHighlightsEvents">
                            {({ field, form }) => (
                              <>
                                <div className='mt-3'>
                                  <Select
                                    value={filteredEvent.filter((obj) =>
                                      field?.value?.includes(obj.value)
                                    )}
                                    options={filteredEvent.map((option) => ({
                                      ...option,
                                      key: generateKey(option.label, option.value),
                                    }))}
                                    className="dropdownOption"
                                    placeholder="Select Event"
                                    onChange={(selectedOption) =>
                                      form.setFieldValue(
                                        field.name,
                                        selectedOption.map((option) => option.value)
                                      )
                                    }
                                    isMulti
                                    isClearable
                                  />
                                </div>
                                {form.touched[field.name] && form.errors[field.name] && (
                                  <div style={{ color: 'red' }}>{form.errors[field.name]}</div>
                                )}
                              </>
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-lg-12 d-flex justify-content-center text-center flex-column heightCol upload-btn-wrapper">
                      <div>
                        <Label className='h5'>Card Hightlights Image</Label>
                        <Popovers title='Alert !' trigger='hover' desc='Fun Image should be width 370 to 400 and height 90 to 100' isDisplayInline={"true"}>
                          <Button icon='Error'></Button>
                        </Popovers>
                      </div>
                      <Row className='d-flex justify-content-center align-items-center mb-3'>
                        <Col lg={2}>
                          <div className="bannerBgImageMain">
                            <img src={HomeDataAutoList?.festivalFunImage} className="bannerBgImage" width={180} height={80} ></img>
                            <div className="black"></div>
                            <div className="bannerBgoverlay">
                              Live Image
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Field name="festivalFunImage">
                        {({ field, form }) => (
                          <>
                            <div className='d-flex justify-content-center mb-2 '>
                              {field.value && (
                                <div className='d-flex align-items-start justify-content-center'>
                                  <img src={URL.createObjectURL(field.value)} alt="Logo Image" width={200} height={100} />
                                  <Button icon='Cancel' isLight color='danger' className='cancelImageBtn' onClick={() => { setFieldValue('festivalFunImage', '') }}></Button>
                                </div>
                              )
                              }

                            </div>
                            <div className='d-flex justify-content-center mb-2'>
                              <button type='button' class="Imgbtn">+</button>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                  const file = event.target.files[0];
                                  form.setFieldValue(field.name, file);
                                  validateImageSize(file, 400, 500, 100, 200)
                                    .then(() => {
                                      form.setFieldError(field.name, '');
                                    })
                                    .catch((error) => {
                                      form.setFieldError(field.name, error);
                                      form.setFieldValue(field.name, '');
                                      // Clear the field value if validation fails
                                    })
                                }}
                              />
                            </div>
                          </>
                        )}
                      </Field>
                    </div>
                    <div className="col-lg-12 heightCol">
                      <div className="row  d-flex justify-content-center">
                        <div className="col-lg-12">
                          <Label className='h5 text-center mb-3 w-100'>Card Hightlights Title</Label>
                          <Field name="festivalTitle">
                            {({ field, form }) => (
                              <>

                                <div>
                                  <JoditEditor
                                    value={values.festivalTitle}
                                    {...field}
                                    onChange={(content) => setFieldValue('festivalTitle', content)}
                                    config={joditToolbarConfig}
                                  />
                                </div>
                              </>
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 heightColcard mt-5 mb-2">
                      <Label className='h5 text-center mb-3 w-100'>Card Hightlights Description</Label>
                      <Field name="festivalDescription" >
                        {({ field, form }) => (
                          <div>
                            {/* <Textarea {...field} placeholder="Description" rows={1} /> */}
                            <JoditEditor
                              value={values.festivalDescription}
                              {...field}
                              onChange={(content) => setFieldValue('festivalDescription', content)}
                              config={joditToolbarConfig}

                            />
                            {/* {form.touched[field.name] && form.errors[field.name] && (
                              <div style={{ color: 'red' }}>{form.errors[field.name]}</div>
                            )}                             */}
                          </div>
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className="row mt-5 mb-3">
                    <div className="col-lg-12 text-center">
                      <div>
                        <Label className='h5 text-center mb-3 mb-3'>Card Image</Label>
                        <Popovers title='Alert !' trigger='hover' desc='Card Image should be width 380 to 400 and height 240 to 280' isDisplayInline={"true"}>
                          <Button icon='Error'></Button>
                        </Popovers>
                      </div>
                    </div>
                    <Row className='d-flex justify-content-around align-items-center'>
                      <Col lg={2} className='cardLiveImageList'>
                        <div className="bannerBgImageMain">
                          <img src={HomeDataAutoList?.sponsorship} className="bannerBgImage" width={160} height={90} ></img>
                          <div className="black"></div>
                          <div className="bannerBgoverlay">
                            Live Image
                          </div>
                        </div>
                      </Col>
                      <Col lg={2} className='cardLiveImageList'>
                        <div className="bannerBgImageMain">
                          <img src={HomeDataAutoList?.vendors} className="bannerBgImage" width={160} height={90} ></img>
                          <div className="black"></div>
                          <div className="bannerBgoverlay">
                            Live Image
                          </div>
                        </div>
                      </Col>
                      <Col lg={2} className='cardLiveImageList'>
                        <div className="bannerBgImageMain">
                          <img src={HomeDataAutoList?.events} className="bannerBgImage" width={160} height={90} ></img>
                          <div className="black"></div>
                          <div className="bannerBgoverlay">
                            Live Image
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <div className="col-lg-12 heightCol">
                      <div className="row d-flex justify-content-center">
                        {/* <div className="col-lg-2 d-flex justify-content-center text-center flex-column upload-btn-wrapper">
                          <Label className='h5'>About Us</Label>
                          <Field name="aboutUs">
                            {({ field, form }) => (
                              <>
                                <div className='d-flex justify-content-center mb-2'>
                                  {field.value && <img src={URL.createObjectURL(field.value)} alt="Logo Image" width={100} height={100} />}
                                </div>
                                <div className='d-flex justify-content-center mb-2'>
                                  <button type='button' class="Imgbtn">+</button>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                      const file = event.target.files[0];

                                      form.setFieldValue(field.name, file);
                                      validateImageSize(file, 380, 400, 240, 280)
                                        .then(() => {
                                          form.setFieldError(field.name, '');
                                        })
                                        .catch((error) => {
                                          form.setFieldError(field.name, error);
                                          form.setFieldValue(field.name, '');
                                          // Clear the field value if validation fails
                                        })
                                    }}
                                  />
                                </div>
                              </>
                            )}
                          </Field>
                        </div> */}
                        <div className="col-lg-4 d-flex justify-content-center text-center flex-column upload-btn-wrapper">
                          <Field name="sponsorship">
                            {({ field, form }) => (
                              <>
                                <div className='d-flex justify-content-center mb-2 mt-2'>
                                  {field.value && (
                                    <div className='d-flex align-items-start justify-content-center'>
                                      <img src={URL.createObjectURL(field.value)} alt="Logo Image" className='cardchooseNewImg' width={180} height={90} />
                                      <Button icon='Cancel' isLight color='danger' className='cancelImageBtn' onClick={() => { setFieldValue('sponsorship', '') }}></Button>
                                    </div>
                                  )
                                  }
                                </div>
                                <Label className='h5 text-center mb-3 w-100'>Sponsorship</Label>
                                <div className='d-flex justify-content-center mb-2'>
                                  <button type='button' class="Imgbtn">+</button>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                      const file = event.target.files[0];
                                      form.setFieldValue(field.name, file);
                                      validateImageSize(file, 380, 400, 240, 280)
                                        .then(() => {
                                          form.setFieldError(field.name, '');
                                        })
                                        .catch((error) => {
                                          form.setFieldError(field.name, error);
                                          form.setFieldValue(field.name, '');
                                          // Clear the field value if validation fails
                                        })
                                    }}
                                  />
                                </div>
                              </>
                            )}
                          </Field>
                        </div>
                        <div className="col-lg-4 d-flex justify-content-center text-center flex-column upload-btn-wrapper">

                          <Field name="vendors">
                            {({ field, form }) => (
                              <>
                                <div className='d-flex justify-content-center mb-2'>
                                  {field.value && (
                                    <div className='d-flex align-items-start justify-content-center'>
                                      <img src={URL.createObjectURL(field.value)} alt="Logo Image" className='cardchooseNewImg' width={180} height={90} />
                                      <Button icon='Cancel' isLight color='danger' className='cancelImageBtn' onClick={() => { setFieldValue('vendors', '') }}></Button>
                                    </div>
                                  )
                                  }
                                </div>
                                <Label className='h5 text-center mb-3 w-100'>Vendor Image</Label>
                                <div className='d-flex justify-content-center mb-2'>
                                  <button type='button' class="Imgbtn">+</button>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                      const file = event.target.files[0];
                                      form.setFieldValue(field.name, file);
                                      validateImageSize(file, 380, 400, 240, 280)
                                        .then(() => {
                                          form.setFieldError(field.name, '');
                                        })
                                        .catch((error) => {
                                          form.setFieldError(field.name, error);
                                          form.setFieldValue(field.name, '');
                                          // Clear the field value if validation fails
                                        })
                                    }}
                                  />
                                </div>
                              </>
                            )}
                          </Field>
                        </div>
                        {/* <div className="col-lg-2 d-flex justify-content-center text-center flex-column upload-btn-wrapper">
                          <Label className='h5'>Festiv Hours</Label>
                          <Field name="festivalHours">
                            {({ field, form }) => (
                              <>
                                <div className='d-flex justify-content-center mb-2'>
                                  {field.value && <img src={URL.createObjectURL(field.value)} alt="Logo Image" width={100} height={100} />}
                                </div>
                                <div className='d-flex justify-content-center mb-2'>
                                  <button type='button' class="Imgbtn">+</button>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                      const file = event.target.files[0];
                                      form.setFieldValue(field.name, file);
                                      validateImageSize(file, 380, 400, 240, 280)
                                        .then(() => {
                                          form.setFieldError(field.name, '');
                                        })
                                        .catch((error) => {
                                          form.setFieldError(field.name, error);
                                          form.setFieldValue(field.name, '');
                                          // Clear the field value if validation fails
                                        })
                                    }}
                                  />
                                </div>
                              </>
                            )}
                          </Field>
                        </div> */}
                        <div className="col-lg-4 d-flex justify-content-center text-center flex-column upload-btn-wrapper">

                          <Field name="events">
                            {({ field, form }) => (
                              <>
                                <div className='d-flex justify-content-center mb-2'>
                                  {field.value && (
                                    <div className='d-flex align-items-start justify-content-center'>
                                      <img src={URL.createObjectURL(field.value)} alt="Logo Image" className='cardchooseNewImg' width={180} height={90} />
                                      <Button icon='Cancel' isLight color='danger' className='cancelImageBtn' onClick={() => { setFieldValue('events', '') }}></Button>
                                    </div>
                                  )
                                  }
                                </div>
                                <Label className='h5 text-center mb-3 w-100'>Events</Label>
                                <div className='d-flex justify-content-center mb-2'>
                                  <button type='button' class="Imgbtn">+</button>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                      const file = event.target.files[0];
                                      form.setFieldValue(field.name, file);
                                      validateImageSize(file, 380, 400, 240, 280)
                                        .then(() => {
                                          form.setFieldError(field.name, '');
                                        })
                                        .catch((error) => {
                                          form.setFieldError(field.name, error);
                                          form.setFieldValue(field.name, '');
                                          // Clear the field value if validation fails
                                        })
                                    }}
                                  />
                                </div>
                              </>
                            )}
                          </Field>
                        </div>
                        {/* <div className="col-lg-2 d-flex justify-content-center text-center flex-column upload-btn-wrapper">
                          <Label className='h5'>Gallery</Label>
                          <Field name="gallery">
                            {({ field, form }) => (
                              <>
                                <div className='d-flex justify-content-center mb-2'>
                                  {field.value && <img src={URL.createObjectURL(field.value)} alt="Logo Image" width={100} height={100} />}
                                </div>
                                <div className='d-flex justify-content-center mb-2'>
                                  <button type='button' class="Imgbtn">+</button>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                      const file = event.target.files[0];
                                      form.setFieldValue(field.name, file);
                                      validateImageSize(file, 380, 400, 240, 280)
                                        .then(() => {
                                          form.setFieldError(field.name, '');
                                        })
                                        .catch((error) => {
                                          form.setFieldError(field.name, error);
                                          form.setFieldValue(field.name, '');
                                          // Clear the field value if validation fails
                                        })
                                    }}
                                  />
                                </div>
                              </>
                            )}
                          </Field>
                        </div> */}
                      </div>
                    </div>

                  </div>
                  <div className="row mt-5">
                    <div className="col-lg-3">
                      <div className='text-center'>
                        <Label className='h5 text-center mb-3'>YouTube Link</Label>
                        <Popovers title='Alert !' trigger='hover' desc='YouTube Watch Link from URL Tab' isDisplayInline={"true"}>
                          <Button icon='Error'></Button>
                        </Popovers>
                      </div>
                      <Field name="youtubeLink">
                        {({ field, form }) => (
                          <>
                            <div>
                              <Input type="url" {...field} placeholder="Enter Youtube Link" />
                            </div>
                            {form.touched[field.name] && form.errors[field.name] && (
                              <div style={{ color: 'red' }}>{form.errors[field.name]}</div>
                            )}
                          </>
                        )}
                      </Field>
                    </div>
                    {/* <div className="col-lg-4">
                      <div className='text-center'>
                        <Label className='h5 text-center mb-3'>Instagram Link</Label>
                        <Popovers title='Alert !' trigger='hover' desc='Offical Instagram Link to connect Footer' isDisplayInline={"true"}>
                          <Button icon='Error'></Button>
                        </Popovers>
                      </div>
                      <Field name="instagramLink">
                        {({ field, form }) => (
                          <>
                            <div>
                              <Input type="url" {...field} placeholder="Enter Instagram Link" />
                            </div>
                            {form.touched[field.name] && form.errors[field.name] && (
                              <div style={{ color: 'red' }}>{form.errors[field.name]}</div>
                            )}
                          </>
                        )}
                      </Field>
                    </div> */}
                    {/* <div className="col-lg-3">
                      <Label className='h6'>Office Email </Label>
                      <Field name="emailId">
                        {({ field, form }) => (
                          <>
                            <div>
                              <Input type="email" {...field} placeholder="Enter Office Email" />
                            </div>
                            {form.touched[field.name] && form.errors[field.name] && (
                              <div style={{ color: 'red' }}>{form.errors[field.name]}</div>
                            )}
                          </>
                        )}
                      </Field>
                    </div> */}
                    <div className="col-lg-3">
                      <div className='text-center'>
                        <Label className='h5 text-center mb-3'>Contact Address</Label>
                        <Popovers title='Alert !' trigger='hover' desc='Search your Office location to show on website live map & Contact Address' isDisplayInline={"true"}>
                          <Button icon='Error'></Button>
                        </Popovers>
                      </div>

                      <LoadScript
                        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
                        libraries={lib}
                      >
                        <StandaloneSearchBox
                          onLoad={onSBLoad}
                          onPlacesChanged={() => onPlacesChanged(setFieldValue)}
                        >
                          <Field name="locationName">
                            {({ field, form }) => (
                              <>
                                <div>
                                  <Input type="text" id='locationName' {...field} placeholder="Enter Location Name" />
                                </div>
                                {form.touched[field.name] && form.errors[field.name] && (
                                  <div style={{ color: 'red' }}>{form.errors[field.name]}</div>
                                )}
                              </>
                            )}
                          </Field>
                        </StandaloneSearchBox>
                        {/* <GoogleMap
                          center={center}
                          zoom={1}
                          mapContainerStyle={mapStyles}
                          onLoad={map => setMap(map)}
                          onClick={(e) => handleMapClick(e)}
                        >
                          <Marker position={markers} />
                        </GoogleMap> */}
                      </LoadScript>
                    </div>
                    <div className="col-lg-3">
                      <div className='text-center'>
                        <Label className='h5 text-center mb-3'>Contact Phone Number</Label>
                        <Popovers title='Alert !' trigger='hover' desc='Official Contact number to show on Website Footer' isDisplayInline={"true"}>
                          <Button icon='Error'></Button>
                        </Popovers>
                      </div>
                      <Field name="contactPhoneNo">
                        {({ field, form }) => (
                          <>
                            <div>
                              <Input type="text" {...field} placeholder="Enter Contact Number" id="contactPhoneNo"
                                name="contactPhoneNo"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.contactPhoneNo} />
                            </div>
                            {form.touched[field.name] && form.errors[field.name] && (
                              <div style={{ color: 'red' }}>{form.errors[field.name]}</div>
                            )}
                            {/* <ErrorMessage name="contactPhoneNo" component="div" style={{ color: 'red' }} /> */}
                          </>
                        )}
                      </Field>
                    </div>
                    <div className="col-lg-3">
                      <div className='text-center'>
                        <Label className='h5 text-center mb-3'>Contact Email</Label>
                        <Popovers title='Alert !' trigger='hover' desc='Official e-mail to show on Website Footer'>
                          <Button icon='Error'></Button>
                        </Popovers>
                      </div>
                      <Field name="contactAdminEnquiryEmail">
                        {({ field, form }) => (
                          <>
                            <div>
                              <Input type="text" {...field} placeholder="Enter Admin Email " />
                            </div>
                            {form.touched[field.name] && form.errors[field.name] && (
                              <div style={{ color: 'red' }}>{form.errors[field.name]}</div>
                            )}
                          </>
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-center text-center mt-5">

                    {/* <div className="col-lg-4">
                      <div className='text-center'>
                        <Label className='h5 text-center mb-3'>Contact Address</Label>
                        <Popovers title='Alert !' trigger='hover' desc='Official Address,City,State,Zipcode to show on Website Footer' isDisplayInline={"true"}>
                          <Button icon='Error'></Button>
                        </Popovers>
                      </div>

                      <Field name="contactAddress">
                        {({ field, form }) => (
                          <>
                            <div>
                              <Input type="text" {...field} placeholder="Enter Contact Address" />
                            </div>
                            {form.touched[field.name] && form.errors[field.name] && (
                              <div style={{ color: 'red' }}>{form.errors[field.name]}</div>
                            )}
                          </>
                        )}
                      </Field>
                    </div> */}

                  </div>
                  <div className='col-lg-12 d-flex justify-content-center align-items-center text-center flex-column heightCol mt-3 mb-3'>
                    <div>
                      <Label className='h5'>Sponsor Image </Label>
                      <Popovers title='Alert !' trigger='hover' desc='Sponsor Image should be width 340 to 360 and height 200 to 500' isDisplayInline={"true"}>
                        <Button icon='Error'></Button>
                      </Popovers>
                    </div>
                    <Row className='d-flex justify-content-around w-100 mt-2 mb-2 '>
                      {
                        HomeDataAutoList?.sponsorImages?.map((item, index) => (
                          <Col lg={2}>
                            <img src={item} alt="" width={100} height={50} />

                          </Col>
                        ))
                      }
                    </Row>
                    <Row className='w-100 d-flex justify-content-center align-items-center'>
                      <FieldArray name="sponsorImages" className='mt-4'>
                        {({ push, remove }) => (
                          <>
                            <div className='row d-flex Sponsoruploadbtn'>
                              {values.sponsorImages.map((sponsorImages, index) => (
                                <div key={index} className='col-lg-3 mt-3'>
                                  <Field name={`sponsorImages[${index}]`}>
                                    {({ field, form }) => (
                                      <>
                                        <div>
                                          {field.value && (
                                            <img src={URL.createObjectURL(field.value)} alt="Banner Image 1" width={140} height={80} className='mb-1' />
                                          )}
                                        </div>
                                        <div className='d-flex justify-content-center mb-2'>
                                          <button type='button' className="ImgSponsorBtn" >+</button>
                                          <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => {
                                              const file = event.target.files[0];
                                              form.setFieldValue(field.name, file);
                                              validateImageSize(file, 200, 220, 70, 90)
                                                .then(() => {
                                                  form.setFieldError(field.name, '');
                                                })
                                                .catch((error) => {
                                                  form.setFieldError(field.name, error);
                                                });
                                            }}
                                          />
                                        </div>
                                      </>
                                    )}
                                  </Field>
                                  <Button color='danger' icon='Cancel' onClick={() => remove(index)}>
                                    Remove
                                  </Button>
                                </div>
                              ))}
                            </div>
                            <div className="col-lg-12 text-center mt-3">
                              <Button color='info' onClick={() => push(null)}>
                                Add Sponsor Image
                              </Button>
                            </div>
                          </>
                        )}
                      </FieldArray>
                    </Row>
                  </div>
                  <div className="text-end">
                    <Button
                      className='w-20 py-3 px-3 my-3'
                      icon={isLoading ? undefined : 'Save'}
                      isDark
                      color={isLoading ? 'success' : 'info'}
                      isDisable={isLoading}
                      onClick={handleSubmit}>
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

          </CardBody>
        </Card>
      </Page>
    </PageWrapper>
  );
};

export default Drafts;

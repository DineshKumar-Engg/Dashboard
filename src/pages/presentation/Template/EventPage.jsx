import React, { useEffect, useState } from 'react'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import Page from '../../../layout/Page/Page'
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card'
import { Field, FieldArray, Formik } from 'formik'
import { AssignedEventFilter, AssignedEventList, AssignedEventLocation, EventPageConfig, EventPageDataList, errorMessage, eventList, getLocationNameList, loadingStatus, successMessage } from '../../../redux/Slice'
import { useDispatch, useSelector } from 'react-redux'
import Option from '../../../components/bootstrap/Option'
import FormGroup from '../../../components/bootstrap/forms/FormGroup'
import Button from '../../../components/bootstrap/Button'
import { Col, Row } from 'react-bootstrap'
import Checks from '../../../components/bootstrap/forms/Checks'
import Label from '../../../components/bootstrap/forms/Label'
import Spinner from '../../../components/bootstrap/Spinner'
import Popovers from '../../../components/bootstrap/Popovers'
import { useNavigate, useParams } from 'react-router-dom'
import showNotification from '../../../components/extras/showNotification'
import Icon from '../../../components/icon/Icon'

const EventPage = () => {

    const { id } = useParams()
    const { token,AssignedLocationList,AssignedEventList,EventTemplateData,Loading,error,success} = useSelector((state) => state.festiv)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);

    const [initialValues, setInitialValues] = useState({
        eventList: [
            {
                eventLocationId: '',
                eventId: '',
                scheduleDate: '',
                scheduleTime: '',
                published: '',
            }
        ],
        BannerImage: ''
    })

    // const imageUrl = EventTemplateData?.BannerImage
    // var imageBlob
    // fetch(imageUrl)
    // .then((response) => response.blob())
    // .then((blob) => {
    //   const objectURL = URL.createObjectURL(blob);
    //   imageBlob= objectURL;
    // })
    // .catch((error) => {
    //   console.error("Error fetching the image:", error);
    // });
    // console.log(imageBlob);
    // useEffect(()=>(
    //     setInitialValues((prevState)=>({...prevState,BannerImage:imageBlob}))
    //     ),[EventTemplateData])
  
    const LocationsLists= AssignedLocationList?.filter((item)=>item?.numberOfTickets>0)
    const uniqueArray = LocationsLists.reduce((accumulator, currentItem) => {
        const isDuplicate = accumulator.some(item => item.eventLocationId === currentItem.eventLocationId);
        if (!isDuplicate) {
          accumulator.push(currentItem);
        }
        return accumulator;
      }, []);

    const LocationNameList = uniqueArray.map(({eventLocationId,eventLocationName})=>({label:eventLocationName,value:eventLocationId}))

    useEffect(() => {
        dispatch(AssignedEventLocation(token))
        dispatch(EventPageDataList({id,token}))
    }, [token])

console.log(EventTemplateData);

    const EventListName = AssignedEventList?.map(({ eventName, _id }) => ({
        label: eventName,
        value: _id
    }))


    const handleSave = (val) => {
        setIsLoading(false);
        showNotification(
          <span className='d-flex align-items-center'>
            <Icon icon='Info' size='lg' className='me-1' />
            <span className='fs-6'>{val}</span>
          </span>,
    
        );
        if (success == "Event Page updated successfully") {
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


    const handleLocation =(e)=>{
        const LocationId = e.target.value
        dispatch(AssignedEventFilter({token,LocationId}))
    }

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
    const disableDates = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate() - 1;

        if (mm < 10) {
            mm = '0' + mm;
        }
        if (dd < 10) {
            dd = '0' + dd;
        }

        return `${yyyy}-${mm}-${dd}`;
    };

    const OnSubmit = async (values,resetForm) => {
       
        // console.log("values",values);

        for (let i=0 ; i < values?.eventList?.length;i++) {
           if(values?.eventList[i].scheduleTime !="" && values?.eventList[i].scheduleDate !=""){
            console.log(values?.eventList[i]);
            let fromTimeHours = parseInt(values?.eventList[i].scheduleTime.split(':')[0], 10);
            const fromTimeMinutes = values?.eventList[i].scheduleTime.split(':')[1];
            let fromTimePeriod = '';
        
            if (fromTimeHours < 12) {
              fromTimePeriod = 'AM';
            } else {
              fromTimePeriod = 'PM';
              if (fromTimeHours > 12) {
                fromTimeHours -= 12;
              }
            }

        
            const convertedFrom = `${fromTimeHours}:${fromTimeMinutes} ${fromTimePeriod}`;

            values.eventList[i].scheduleDateAndTime = values.eventList[i].scheduleDate.concat(" ",convertedFrom) 

         
           }

        }
        for (let i=0 ; i < values?.eventList?.length;i++) {
             const removeField = ({ scheduleDate,scheduleTime, ...rest }) => rest;
             values.eventList[i] = removeField(values.eventList[i]);
         }

        console.log("values",values);

        // const formData = new FormData();
        // for (let value in values) {
        //   if (value != 'eventList')
        //     {
        //         formData.append(value, values[value]);
        //     }
        // }

        // formData.append('eventList', values?.eventList)

        // for (let value in values?.eventList) {
        //       formData.append(value, values[value]);
        // }
         setIsLoading(true)
         
        dispatch(EventPageConfig({token,id,values}))
        resetForm()

    };

    return (
        <PageWrapper>
            <Page>
                <Card>
                    <CardHeader>
                        <CardLabel icon='Event' iconColor='success'>
                            <CardTitle>Event Page</CardTitle>
                        </CardLabel>
                    </CardHeader>
                    <CardBody>
                        <div className='container'>
                            <Formik initialValues={initialValues} onSubmit={(values,{resetForm}) => { OnSubmit(values,resetForm) }} enableReinitialize={true}>
                                {({ values, handleSubmit, handleChange, setFieldValue, handleBlur ,resetForm}) => (
                                    <form onSubmit={handleSubmit}>
                                        <Row>
                                            <div className="col-lg-12 d-flex justify-content-center align-items-center flex-column upload-btn-wrapper">
                                                <div>
                                                    <Label className='h5'>Logo Image</Label>
                                                    <Popovers title='Alert !' trigger='hover' desc='Banner Image should be width 1900 to 2000 and height 500 to 600' isDisplayInline="true">
                                                        <Button icon='Error'></Button>
                                                    </Popovers>
                                                </div>
                                                <Field name="BannerImage">
                                                    {({ field, form }) => (
                                                        <>
                                                            <div className='d-flex justify-content-center mb-2'>
                                                                {field.value && <img src={ field.value == "" ? values.BannerImage : URL.createObjectURL(field.value)} alt="Logo Image" width={200} height={100} />}
                                                            </div>
                                                            <div className='d-flex justify-content-end mb-2'>
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
                                                                                // Clear the field value if validation fails
                                                                            })
                                                                    }}
                                                                />
                                                            </div>
                                                        </>
                                                    )}
                                                </Field>
                                            </div>

                                        </Row>
                                        <FieldArray name='eventList'>
                                            {({ push, remove }) => (
                                                <>
                                                    {values?.eventList?.map((_, index) => (
                                                        <>
                                                            <Row key={index}>
                                                                <Col lg={12}>
                                                                    <Row>
                                                                        <Col lg={6} className='d-flex flex-row justify-content-evenly align-items-center gap-3'>
                                                                            <FormGroup className='locationSelect '>
                                                                                <Field
                                                                                    as="select"
                                                                                    name={`eventList.${index}.eventLocationId`}
                                                                                    onChange={handleChange}
                                                                                    onClick={(e)=>handleLocation(e)}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.eventList[index].eventLocationId}
                                                                                >
                                                                                    <Option value=''>Select location</Option>
                                                                                    {
                                                                                        LocationNameList?.map((item) => (
                                                                                            <>
                                                                                                <Option value={item?.value}  >{item?.label}</Option>
                                                                                            </>
                                                                                        ))
                                                                                    }
                                                                                </Field>
                                                                            </FormGroup>

                                                                            <FormGroup className='locationSelect '>

                                                                                <Field
                                                                                    as="select"
                                                                                    name={`eventList.${index}.eventId`}
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.eventList[index].eventId}
                                                                                >
                                                                                    <Option value=''>Select Event</Option>
                                                                                    {
                                                                                        EventListName?.map((item) => (
                                                                                            <>
                                                                                                <Option value={item?.value}>{item?.label}</Option>
                                                                                            </>
                                                                                        ))
                                                                                    }
                                                                                </Field>
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col lg={6}>
                                                                            <Row className='radioGroup mt-3'>
                                                                                <Col lg={4} className=' fs-5 eventRadio1'>
                                                                                    <Label className={values.eventList[index].published === 'schedule' ?" bg-warning text-white fw-normal px-2 py-2 rounded" : "bg-info text-white fw-normal px-2 py-2"}> 
                                                                                    <Field
                                                                                        type="radio"
                                                                                        name={`eventList.${index}.published`}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        value='schedule'
                                                                                        
                                                                                    />
                                                                                        Schedule Date</Label>
                                                                                </Col>
                                                                                <Col lg={4} className=' fs-5 eventRadio2'>
                                                                                    <Label className={values.eventList[index].published === 'now' ? "bg-success text-white fw-normal px-2 py-2 rounded" : "bg-info text-white fw-normal px-2 py-2 "}> 
                                                                                    <Field
                                                                                        type="radio"
                                                                                        name={`eventList.${index}.published`}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        value='now'
                                                                                    />
                                                                                        Publish Now</Label>
                                                                                </Col>
                                                                                <Col lg={4} className=' fs-5 eventRadio3'>
                                                                                    <Label className={values.eventList[index].published === 'unpublish' ? "bg-danger text-white fw-normal px-2 py-2 rounded" : "bg-info text-white fw-normal px-2 py-2"}>
                                                                                        <Field
                                                                                            type="radio"
                                                                                            name={`eventList.${index}.published`}
                                                                                            onChange={handleChange}
                                                                                            onBlur={handleBlur}
                                                                                            value='unpublish'
                                                                                        />
                                                                                        Un-Publish</Label>
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                {
                                                                    values?.eventList[index]?.published == 'schedule' && (
                                                                        <Col lg={12} >
                                                                            <Row className='d-flex justify-content-center'>
                                                                                <Col lg={3}>
                                                                                    <Field
                                                                                        type="date"
                                                                                        name={`eventList.${index}.scheduleDate`}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        value={values.eventList[index].scheduleDate}
                                                                                        className='form-control'
                                                                                        min={disableDates()}
                                                                                    />
                                                                                </Col>
                                                                                <Col lg={3}>
                                                                                    <Field
                                                                                        type="time"
                                                                                        name={`eventList.${index}.scheduleTime`}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        value={values.eventList[index].scheduleTime}
                                                                                        className='form-control'
                                                                                    />
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                    )
                                                                }
                                                                <Col>
                                                                    {values?.eventList[index]?.published == 'unpublish' && (
                                                                        <div className='d-flex justify-content-end'>
                                                                            <Button type="button" icon='Delete' color={'danger'} isLight onClick={() => remove(index)}>
                                                                                Delete
                                                                            </Button>
                                                                        </div>
                                                                    )}
                                                                </Col>
                                                            </Row>
                                                            <hr/>
                                                            <div>
                                                                {index === values.eventList.length -1 &&  index !== values.eventList.length && (
                                                                    <Button
                                                                        type="button"
                                                                        onClick={() => push({
                                                                            eventLocationId: '',
                                                                            eventId: '',
                                                                            scheduleDate: '',
                                                                            scheduleTime: '',
                                                                        })}
                                                                        color={'warning'}
                                                                        className='mt-4 px-4 py-2 fs-5'
                                                                        icon={'Add'}
                                                                    >
                                                                        Add
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </>
                                                    ))

                                                    }
                                                </>
                                            )}
                                        </FieldArray>
                                        <div className='text-end'>
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

export default EventPage
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter, DialogHeader,
    Input,
    Typography,
} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { putChartSettingsAsync } from "../../store/chartSettings/thunks";
import {Player} from "@lottiefiles/react-lottie-player";

const ChartSettingsModal = (props) => {
    const user = useSelector((state) => state.loginReducer);
    const [modalChartSettings, setModalChartSettings] = useState(structuredClone(props.chartSettings));
    const dispatch = useDispatch();

    useEffect(() => {
        setModalChartSettings(structuredClone(props.chartSettings))
    }, [props]);

    const handlePut = () => {
        dispatch(putChartSettingsAsync([user.user.userID, modalChartSettings]));
    };

    return (
        <>
            {props.children}
            <Dialog
                open={props.visible}
                handler={props.setVisible}
                size="xs"
                className="min-w-max"
            >
                <DialogHeader>Chart Settings</DialogHeader>
                <DialogBody divider className="h-[40rem] overflow-y-auto">
                    <Input
                        variant="outlined"
                        label="Visible Hour Range (1 to 84 Hours Before and After)"
                        color="blue-gray"
                        type="number"
                        containerProps={{ className: "mb-5" }}
                        value={modalChartSettings.axisTimeScale}
                        onChange={(e) => {
                            // Max and min checking
                            if (e.target.value > 84) {
                                e.target.value = "84";
                                setModalChartSettings((prevProps) => ({
                                    ...prevProps,
                                    axisTimeScale: 84
                                }))
                            } else if (e.target.value < 1) {
                                e.target.value = "1";
                                setModalChartSettings((prevProps) => ({
                                    ...prevProps,
                                    axisTimeScale: 1
                                }))
                            }

                            // Set axisTimeScale
                            setModalChartSettings((prevProps) => ({
                                ...prevProps,
                                axisTimeScale: e.target.value
                            }))
                        }}
                    />
                    <Input
                        variant="outlined"
                        label="Relative Vertical Scale (1 to 100)"
                        color="blue-gray"
                        type="number"
                        value={modalChartSettings.axisVerticalScale}
                        onChange={(e) => {
                            // Max and min checking
                            if (e.target.value > 100) {
                                e.target.value = "100";
                                setModalChartSettings((prevProps) => ({
                                    ...prevProps,
                                    axisVerticalScale: 100
                                }))
                            } else if (e.target.value < 1) {
                                e.target.value = "1";
                                setModalChartSettings((prevProps) => ({
                                    ...prevProps,
                                    axisVerticalScale: 1
                                }))
                            }

                            // Set axisTimeScale
                            setModalChartSettings((prevProps) => ({
                                ...prevProps,
                                axisVerticalScale: e.target.value
                            }))
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="mt-3 text-center">
                        Category Colors
                    </Typography>
                    {modalChartSettings.categoryColors.length === 0 ?
                        <div className="mx-auto">
                            <Typography className="text-center">
                                No categories to color...
                            </Typography>
                            <div className="flex items-center justify-center">
                                <Player
                                    src={
                                        "https://lottie.host/13926b54-ea64-4465-bbe6-2fc45507cb74/jiSPjnMiBV.json"
                                    }
                                    style={{ height: "300px", width: "600px", padding: 0 }}
                                    autoplay
                                    loop
                                />
                            </div>
                        </div> : null}
                    <div className="grid gap-x-3 gap-y-5 sm:grid-cols-3">
                        {modalChartSettings.categoryColors.map((item, index) =>
                            <div key={index} className="sm:col-span-1 mt-5">
                                <Input
                                    type="color"
                                    className="mb-5"
                                    variant="outlined"
                                    label={item.category + " TODO Color"}
                                    color="blue-gray"
                                    value={item.color}
                                    onChange={(e) => setModalChartSettings((prevState) => ({
                                        axisTimeScale: prevState.axisTimeScale,
                                        axisVerticalScale: prevState.axisVerticalScale,
                                        categoryColors: prevState.categoryColors.map(c => {
                                            if (c.category === item.category) {
                                                c.color = e.target.value;
                                            }
                                            return c;
                                        })
                                    }))}
                                />
                            </div>
                        )}
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        onClick={() => {
                            props.setVisible(false);
                        }}
                        className="border-indigo-300 bg-white text-indigo-300 border-solid border m-2"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        className="bg-indigo-300 text-white m-2"
                        onClick={() => {
                            handlePut();
                            props.setVisible(false);
                        }}
                    >
                        Edit
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default ChartSettingsModal;

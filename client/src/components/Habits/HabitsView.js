import {
  Button,
  Card,
  Input,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Checkbox,
  CardBody,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  CardFooter,
  IconButton,
} from "@material-tailwind/react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getHabitsAsync,
  addHabitAsync,
  toggleHabitDateAsync,
  deleteHabitAsync,
} from "../../store/habits/thunks";
import dayjs from "dayjs";
let utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

const HabitsView = () => {
  /* Adapted From Material UI Docs */
  const user = useSelector((state) => state.loginReducer);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [days, setDays] = useState(new Array(7).fill(true));
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());

  const [checkedHabits, setCheckedHabits] = useState(new Set());

  const { habits } = useSelector((state) => state.habitReducer);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setDays(new Array(7).fill(true));
    setOpen(!open);
  }

  useEffect(() => {
    if (user.isLoggedIn) {
      dispatch(getHabitsAsync(user.user.userID));
    }
  }, [dispatch, user]);

  const addNewHabit = () => {
    if (
      (startTime === dayjs(undefined) && endTime === dayjs(undefined)) ||
      (startTime.isValid() && endTime.isValid() && startTime.isBefore(endTime))
    ) {
      const habit = {
        userID: user.user.userID,
        name: name,
        days: days,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        dates: [],
      };
      dispatch(addHabitAsync(habit));
    }
    handleOpen();
  };

  const handleDays = (i) => {
    let newDays = [...days];
    newDays[i] = !newDays[i];
    setDays(newDays);
  };

  const toggleHabit = (habitID) => {
    dispatch(toggleHabitDateAsync(habitID));

    let prevSet = new Set([...checkedHabits]);
    if (prevSet.has(habitID)) {
      prevSet.delete(habitID);
    } else {
      prevSet.add(habitID);
    }
    setCheckedHabits(prevSet);
  };

  const deleteHabit = (habitID) => {
    dispatch(deleteHabitAsync(habitID));
  };

  const isTicked = (habit) => {
    let today = dayjs().utc();

    return !(
      habit.dates.length === 0 ||
      (habit.dates.length > 0 &&
        today.diff(habit.dates[habit.dates.length - 1], 'day'))
    );
  };

  return (
    <>
      <Card className="shadow-xl shadow-pmd-blue-600 min-h-[17rem] min-w-[20rem] pb-0">
        <div className="p-3 pb-0">
          <Typography variant="h5" color="black">
            Habits
          </Typography>
          <Typography className="mb-3">
            Here's your habits for today.
          </Typography>
        </div>
        <CardBody className="flex-1 py-0 max-h-[10rem] overflow-y-auto scrollbar-none scrollbar-thumb-rounded-full scrollbar-thumb-blue-gray-100/50">
          <List className="w-full">
            {habits.map((habit) => {
              if (habit.days[dayjs().day()]) {
                return (
                  <ListItem key={habit._id} className="group p-0">
                    <label
                      htmlFor={habit._id}
                      className="px-3 py-2 flex items-center w-full cursor-pointer"
                    >
                      <ListItemPrefix className="mr-3">
                        <Checkbox
                          id={habit._id}
                          ripple={false}
                          color="indigo"
                          className="border-indigo-300/50 bg-indigo-50 transition-all hover:scale-105 hover:before:opacity-0"
                          containerProps={{
                            className: "p-0",
                          }}
                          onClick={() => toggleHabit(habit._id)}
                          defaultChecked={isTicked(habit)}
                        />
                      </ListItemPrefix>
                      <Typography color="blue-gray" className="font-medium">
                        {habit.name}
                      </Typography>
                      <IconButton
                        color="blue-gray"
                        variant="text"
                        size="sm"
                        className="hidden group-hover:block rounded-full ml-auto"
                        onClick={() => deleteHabit(habit._id)}
                      >
                        ✕
                      </IconButton>
                    </label>
                  </ListItem>
                );
              }
            })}
          </List>
        </CardBody>
        <CardFooter className="p-3 flex items-center border-t border-gray-400/50">
          <Button
            onClick={handleOpen}
            className="bg-indigo-300 hover:shadow-indigo-100 shadow-indigo-100"
          >
            Add Habit
          </Button>
        </CardFooter>
      </Card>
      <Dialog size="sm" open={open} handler={handleOpen}>
        <DialogHeader>Add a New Habit</DialogHeader>
        <DialogBody divider>
          <Input
            size="lg"
            label="Name"
            value={name}
            color="blue-gray"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex flex-row my-5 justify-between">
            <TimePicker
              label="start-time"
              disableOpenPicker
              onChange={(newStart) => setStartTime(newStart)}
            />
            <TimePicker
              label="end-time"
              disableOpenPicker
              onChange={(newEnd) => setEndTime(newEnd)}
            />
          </div>
          <label htmlFor="sunday">
            <Checkbox
              id="sunday"
              defaultChecked
              icon={"S"}
              ripple={false}
              color="indigo"
              className="h-8 w-8 border-indigo-300/50 bg-indigo-50 transition-all hover:scale-105 hover:before:opacity-0"
              onChange={() => handleDays(0)}
            />
          </label>
          <label htmlFor="monday">
            <Checkbox
              id="monday"
              defaultChecked
              icon={"M"}
              ripple={false}
              color="indigo"
              className="h-8 w-8 border-indigo-300/50 bg-indigo-50 transition-all hover:scale-105 hover:before:opacity-0"
              onChange={() => handleDays(1)}
            />
          </label>
          <label htmlFor="tuesday">
            <Checkbox
              id="tuesday"
              defaultChecked
              icon={"T"}
              ripple={false}
              color="indigo"
              className="h-8 w-8 border-indigo-300/50 bg-indigo-50 transition-all hover:scale-105 hover:before:opacity-0"
              onChange={() => handleDays(2)}
            />
          </label>
          <label htmlFor="wednesday">
            <Checkbox
              id="wednesday"
              defaultChecked
              icon={"W"}
              ripple={false}
              color="indigo"
              className="h-8 w-8 border-indigo-300/50 bg-indigo-50 transition-all hover:scale-105 hover:before:opacity-0"
              onChange={() => handleDays(3)}
            />
          </label>
          <label htmlFor="thursday">
            <Checkbox
              id="thursday"
              defaultChecked
              icon={"T"}
              ripple={false}
              color="indigo"
              className="h-8 w-8 border-indigo-300/50 bg-indigo-50 transition-all hover:scale-105 hover:before:opacity-0"
              onChange={() => handleDays(4)}
            />
          </label>
          <label htmlFor="friday">
            <Checkbox
              id="friday"
              defaultChecked
              icon={"F"}
              ripple={false}
              color="indigo"
              className="h-8 w-8 border-indigo-300/50 bg-indigo-50 transition-all hover:scale-105 hover:before:opacity-0"
              onChange={() => handleDays(5)}
            />
          </label>
          <label htmlFor="saturday">
            <Checkbox
              id="saturday"
              defaultChecked
              icon={"S"}
              ripple={false}
              color="indigo"
              className="h-8 w-8 border-indigo-300/50 bg-indigo-50 transition-all hover:scale-105 hover:before:opacity-0"
              onChange={() => handleDays(6)}
            />
          </label>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            onClick={handleOpen}
            className="mr-1 hover:bg-indigo-50 text-indigo-300"
          >
            Cancel
          </Button>
          <Button
            className="bg-indigo-300 hover:shadow-indigo-100 shadow-indigo-100"
            onClick={addNewHabit}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default HabitsView;

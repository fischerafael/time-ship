import { CSVLink, CSVDownload } from "react-csv";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";

import { Flex, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useState } from "react";
import { Input } from "../components/Input";

export const TimeSheet = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isPeople, setIsPeople] = useState(true);

  const [fileName, setFileName] = useState("");

  const [people, setPeople] = useState({
    workerName: "",
    workerEmail: "",
    supervisorName: "",
    supervisorEmail: "",
  });

  const [day, setDay] = useState({
    date: "",
    timeIn: 10,
    timeOut: 19,
    lunchBreakDuration: 1,
    hoursWorked: 8,
    tasks: "daily, ",
  });

  const [days, setDays] = useState<any[]>([]);

  console.log("DAY", day);

  const onAddPeople = () => {
    onClose();
  };

  const onRemovePeople = () => {
    setPeople({
      workerName: "",
      workerEmail: "",
      supervisorName: "",
      supervisorEmail: "",
    });
  };

  const onAddDay = () => {
    setDays([...days, day]);
    setDay({
      date: "",
      timeIn: 10,
      timeOut: 19,
      lunchBreakDuration: 0,
      hoursWorked: 0,
      tasks: "daily, ",
    });
    onClose();
  };

  const onRemoveDay = (date: string) => {
    setDays(days.filter((day) => day.date !== date));
  };

  const formatedCSVDays = days.map((day) => {
    return [
      day.date,
      day.timeIn,
      day.timeOut,
      day.lunchBreakDuration,
      day.hoursWorked,
      day.tasks,
    ];
  });

  const csv = [
    ["Worker Name", people.workerName, "Worker Email", people.workerEmail],
    [
      "Supervisor Name",
      people.supervisorName,
      "Supervisor Email",
      people.supervisorEmail,
    ],
    ["Date", "Time In", "Time Out", "Lunch Duration", "Hours Worked", "Tasks"],
    ...formatedCSVDays,
  ];

  return (
    <VStack w="100vw" h="100vh" align="center" fontFamily="monospace">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="full">
          <ModalCloseButton />
          <ModalBody w="full">
            <VStack p="8" w="full" spacing="8">
              {isPeople && (
                <>
                  <VStack w="full" align="flex-start">
                    <Text fontSize="xl" textAlign="left">
                      Timesheet
                    </Text>
                    <Input
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      label="Name"
                    />
                  </VStack>
                  <VStack w="full" align="flex-start">
                    <Text fontSize="xl" textAlign="left">
                      Worker
                    </Text>
                    <Input
                      value={people.workerName}
                      onChange={(e) =>
                        setPeople({ ...people, workerName: e.target.value })
                      }
                      label="Name"
                    />
                    <Input
                      value={people.workerEmail}
                      onChange={(e) =>
                        setPeople({ ...people, workerEmail: e.target.value })
                      }
                      label="Email"
                      type="email"
                    />
                  </VStack>
                  <VStack w="full" align="flex-start">
                    <Text fontSize="xl" textAlign="left">
                      Supervisor
                    </Text>
                    <Input
                      value={people.supervisorName}
                      onChange={(e) =>
                        setPeople({ ...people, supervisorName: e.target.value })
                      }
                      label="Name"
                    />
                    <Input
                      value={people.supervisorEmail}
                      onChange={(e) =>
                        setPeople({
                          ...people,
                          supervisorEmail: e.target.value,
                        })
                      }
                      label="Email"
                      type="email"
                    />
                  </VStack>
                  <Button
                    onClick={onAddPeople}
                    alignSelf="flex-end"
                    colorScheme="teal"
                  >
                    Add
                  </Button>
                </>
              )}

              {!isPeople && (
                <>
                  <VStack w="full" align="flex-start">
                    <Text fontSize="xl" textAlign="left">
                      Day
                    </Text>
                    <Input
                      value={day.date}
                      onChange={(e) => setDay({ ...day, date: e.target.value })}
                      label="Date"
                      type="date"
                    />
                    <HStack w="full" spacing="4">
                      <Input
                        value={day.timeIn}
                        onChange={(e) =>
                          setDay({ ...day, timeIn: +e.target.value })
                        }
                        label="Time In"
                        type="number"
                      />
                      <Input
                        value={day.timeOut}
                        onChange={(e) =>
                          setDay({ ...day, timeOut: +e.target.value })
                        }
                        label="Time Out"
                        type="number"
                      />
                    </HStack>
                    <HStack w="full" spacing="4">
                      <Input
                        value={day.lunchBreakDuration}
                        onChange={(e) =>
                          setDay({
                            ...day,
                            lunchBreakDuration: +e.target.value,
                          })
                        }
                        label="Lunch Break Duration"
                        type="number"
                      />
                      <Input
                        value={day.hoursWorked}
                        onChange={(e) =>
                          setDay({ ...day, hoursWorked: +e.target.value })
                        }
                        label="Hours Worked"
                        type="number"
                      />
                    </HStack>
                  </VStack>
                  <VStack w="full" align="flex-start">
                    <Text fontSize="xl" textAlign="left">
                      Tasks
                    </Text>
                    <Input
                      value={day.tasks}
                      onChange={(e) =>
                        setDay({ ...day, tasks: e.target.value })
                      }
                      label="Name"
                    />
                  </VStack>
                  <Button
                    onClick={onAddDay}
                    alignSelf="flex-end"
                    colorScheme="teal"
                  >
                    Add
                  </Button>
                </>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <VStack w="full" h="full" maxW="container.lg" p="4" spacing="16">
        <HStack w="full" justify="space-between" h="15vh">
          <Text fontSize="xl" fontWeight="bold">
            Time Ship
          </Text>
        </HStack>
        <VStack w="full" spacing="8">
          <HStack w="full" justify="space-between">
            <Text fontSize="xl">People Details</Text>

            <HStack spacing="4">
              <Button
                onClick={onRemovePeople}
                variant="ghost"
                alignSelf="flex-end"
                colorScheme="teal"
              >
                Remove Details
              </Button>
              <Button
                onClick={() => {
                  onOpen();
                  setIsPeople(true);
                }}
                alignSelf="flex-end"
                colorScheme="teal"
              >
                Add
              </Button>
            </HStack>
          </HStack>

          {people.workerName &&
            people.workerEmail &&
            people.supervisorName &&
            people.supervisorEmail && (
              <SimpleGrid
                gap="8"
                templateColumns={["1fr 1fr", "1fr 1fr 1fr 1fr"]}
                w="full"
              >
                <VStack w="full" align="flex-start">
                  <Text>Worker Name</Text>
                  <Text wordBreak="break-word">{people.workerName}</Text>
                </VStack>
                <VStack w="full" align="flex-start">
                  <Text>Worker Email</Text>
                  <Text wordBreak="break-word">{people.workerEmail}</Text>
                </VStack>
                <VStack w="full" align="flex-start">
                  <Text>Supervisor Name</Text>
                  <Text wordBreak="break-word">{people.supervisorName}</Text>
                </VStack>
                <VStack w="full" align="flex-start">
                  <Text>Supervisor Email</Text>
                  <Text wordBreak="break-word">{people.supervisorEmail}</Text>
                </VStack>
              </SimpleGrid>
            )}
        </VStack>

        <HStack w="full" justify="space-between">
          <Text fontSize="xl">Days</Text>

          <HStack spacing="4">
            <Button
              onClick={() => {
                onOpen();
                setIsPeople(false);
              }}
              alignSelf="flex-end"
              colorScheme="teal"
            >
              Add
            </Button>
          </HStack>
        </HStack>
        <VStack w="full" spacing="4">
          {days.length && (
            <SimpleGrid
              w="full"
              templateColumns="2fr 1fr 1fr 1fr 1fr 3fr 1fr"
              gap="2"
            >
              <Text fontSize="xs">Date</Text>
              <Text fontSize="xs">Time In</Text>
              <Text fontSize="xs">Time Out</Text>
              <Text fontSize="xs">Lunch Duration</Text>
              <Text fontSize="xs">Hours Worked</Text>
              <Text fontSize="xs">Tasks Done</Text>
            </SimpleGrid>
          )}

          {days.map((day) => (
            <SimpleGrid
              w="full"
              templateColumns="2fr 1fr 1fr 1fr 1fr 3fr 1fr"
              gap="2"
              alignItems="center"
              key={day.date}
            >
              <Text wordBreak="break-word">{day.date}</Text>
              <Text wordBreak="break-word">{day.timeIn}</Text>
              <Text wordBreak="break-word">{day.timeOut}</Text>
              <Text wordBreak="break-word">{day.lunchBreakDuration}</Text>
              <Text wordBreak="break-word">{day.hoursWorked}</Text>
              <Text wordBreak="break-word">{day.tasks}</Text>
              <Button onClick={() => onRemoveDay(day.date)}>X</Button>
            </SimpleGrid>
          ))}
          <Button colorScheme="teal" alignSelf="flex-end">
            <CSVLink filename={`${fileName}.csv`} data={csv}>
              Download Timesheet
            </CSVLink>
          </Button>
        </VStack>
      </VStack>
    </VStack>
  );
};

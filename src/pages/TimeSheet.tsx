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
    lunchBreakDuration: 0,
    hoursWorked: 0,
    tasks: "",
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
    onClose();
  };

  const onRemoveDay = (date: string) => {
    setDays(days.filter((day) => day.date !== date));
  };

  console.log("DAYS", days);

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

      <VStack w="full" h="full" maxW="container.lg" p="4" spacing="4">
        <HStack w="full" justify="space-between" h="15vh">
          <Text fontSize="xl">Time Sheep</Text>
        </HStack>

        <HStack w="full" justify="space-between">
          <Text fontSize="xl">People Details</Text>

          <HStack spacing="4">
            <Button
              onClick={onRemovePeople}
              variant="ghost"
              alignSelf="flex-end"
              colorScheme="teal"
            >
              Remove
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

        <Flex justify="space-between" w="full">
          <VStack>
            <Text>Worker Name</Text>
            <Text>{people.workerName}</Text>
          </VStack>
          <VStack>
            <Text>Worker Email</Text>
            <Text>{people.workerEmail}</Text>
          </VStack>
          <VStack>
            <Text>Supervisor Name</Text>
            <Text>{people.supervisorName}</Text>
          </VStack>
          <VStack>
            <Text>Supervisor Email</Text>
            <Text>{people.supervisorEmail}</Text>
          </VStack>
        </Flex>

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

        <VStack w="full">
          {days.map((day) => (
            <SimpleGrid
              w="full"
              templateColumns="3fr 1fr 1fr 1fr 1fr 3fr 1fr"
              gap="2"
              key={day.date}
            >
              <Text>{day.date}</Text>
              <Text>{day.timeIn}</Text>
              <Text>{day.timeOut}</Text>
              <Text>{day.lunchBreakDuration}</Text>
              <Text>{day.hoursWorked}</Text>
              <Text>{day.tasks}</Text>
              <Button onClick={() => onRemoveDay(day.date)}>X</Button>
            </SimpleGrid>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
};

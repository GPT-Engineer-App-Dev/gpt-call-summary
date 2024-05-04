import { useState } from "react";
import { Container, VStack, Textarea, Button, Text } from "@chakra-ui/react";
import { FaRocket } from "react-icons/fa";

const Index = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const summarizeText = async () => {
    if (!text) return;

    setIsLoading(true);
    try {
      // Simulating a call to OpenAI's GPT-3.5 API
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Error summarizing text:", error);
      setSummary("Failed to summarize the text.");
    }
    setIsLoading(false);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Text Summarizer</Text>
        <Textarea placeholder="Enter your text here..." value={text} onChange={handleTextChange} size="lg" height="200px" />
        <Button leftIcon={<FaRocket />} colorScheme="teal" variant="solid" onClick={summarizeText} isLoading={isLoading} loadingText="Summarizing">
          Summarize Text
        </Button>
        <Textarea placeholder="Summary will appear here..." value={summary} size="lg" height="200px" isReadOnly />
      </VStack>
    </Container>
  );
};

export default Index;

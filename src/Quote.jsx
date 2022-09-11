import React from 'react'
import { Paper, Blockquote, Button, Box, Divider, Space, ActionIcon } from '@mantine/core'
import { Volume, Copy, BrandTwitter } from 'tabler-icons-react'
import { toast } from 'react-toastify'

const synth = window.speechSynthesis

const speak = (content) => {
    if (synth.speaking) {
        return;
    }
    const toSpeak = new SpeechSynthesisUtterance(content)
    toSpeak.onend = e => {
        console.log("Done speaking...")
    }
    toSpeak.onerror = e => {
        console.log("Error speaking...")
    }
    synth.speak(toSpeak)
}
function Quote(props) {
    const { content, author, getQuote } = props

    if(!content) {
        return null
    }

    const handleSpeakOnClick = () => {
        speak(content)
    }

    const handleCopyQuote = () => {
        navigator.clipboard.writeText(content)
        toast.info("Quote copied")
    }
  return (
    <Paper shadow="xs" p="md" style={{ minWidth: "80vw" }}>
        <Blockquote cite={author ? `- ${author}` : ""}>
            { content }
        </Blockquote>
        <Space h="md" />
        <Divider />
        <Space h="md" />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex "}}>
                <ActionIcon size="lg">
                    <Volume size={24} onClick={handleSpeakOnClick} />
                </ActionIcon>
                <ActionIcon size="lg">
                    <Copy size={24} onClick={handleCopyQuote}/>
                </ActionIcon>
                <ActionIcon component="a" target="_blank" href={`https://twitter.com/intent/tweet?text=${content} - ${author}`} size="lg">
                    <BrandTwitter size={24} />
                </ActionIcon>
            </Box>
            <Button onClick={getQuote}>New Quote</Button>
        </Box>
    </Paper>
  )
}

export default Quote


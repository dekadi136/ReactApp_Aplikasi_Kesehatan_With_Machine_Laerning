export const sendChatMessage = async (message) => {
  try {
    const response = await fetch(
      "https://dekadi136-chatbot-fastapi.hf.space/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }
    );

    if (!response.ok) {
      throw new Error("Gagal menghubungi chatbot");
    }

    const data = await response.json();
    return {
      success: true,
      response: data.response,
    };
  } catch (error) {
    return {
      success: false,
      response: "Maaf, chatbot sedang tidak tersedia.",
    };
  }
};

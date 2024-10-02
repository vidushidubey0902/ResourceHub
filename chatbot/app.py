import streamlit as st
import os
import json
from langchain_groq import ChatGroq
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv
import time

load_dotenv()

groq_api_key = os.getenv('GROQ_API_KEY')
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")


class Document:
    def __init__(self, title, description, url, language):
        self.title = title
        self.description = description
        self.url = url
        self.language = language
        self.page_content = f"Title: {self.title}\nDescription: {self.description}\nURL: {self.url}\nLanguage: {self.language}"
        self.metadata = {"language": self.language}


def load_json_data(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data


def vector_embedding(data):
    if "vectors" not in st.session_state:
        st.session_state.embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        documents = []
        for lang in data["languages"]:
            language = lang["language"]
            for resource in lang["resources"]:
                doc = Document(
                    title=resource["title"],
                    description=resource["description"],
                    url=resource["link"],
                    language=language
                )
                documents.append(doc)
        st.session_state.text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        st.session_state.final_documents = st.session_state.text_splitter.split_documents(documents)
        st.session_state.vectors = FAISS.from_documents(st.session_state.final_documents, st.session_state.embeddings)

def main():
    st.title("Developer Resources Chatbot")

    if "embedding_done" not in st.session_state:
        st.session_state.embedding_done = False

    data = load_json_data('resources.json')

    if st.button('Load Resources and Create Embeddings') and not st.session_state.embedding_done:
        vector_embedding(data)
        st.write("Vector Store DB is ready")
        st.session_state.embedding_done = True

    if st.session_state.embedding_done:
        st.title("Llama3 Powered RAG Q&A")

        prompt1 = st.text_input("Enter Your Question About Developer Resources")

        if prompt1:
            document_chain = create_stuff_documents_chain(llm, prompt)
            retriever = st.session_state.vectors.as_retriever()
            retrieval_chain = create_retrieval_chain(retriever, document_chain)
            start = time.process_time()
            response = retrieval_chain.invoke({'input': prompt1})
            st.write(f"Response time: {time.process_time() - start} seconds")
            st.write(response['answer'])

            with st.expander("Document Similarity Search"):
                for i, doc in enumerate(response["context"]):
                    st.write(doc.page_content)
                    st.write("--------------------------------")

if __name__ == '__main__':
    load_dotenv()
    groq_api_key = os.getenv('GROQ_API_KEY')
    os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")
    
    llm = ChatGroq(groq_api_key=groq_api_key, model_name="Llama3-8b-8192")
    prompt = ChatPromptTemplate.from_template(
        """
        Your name is Dev-10 Chatbot , you are a helping chatbot which helps developers learn technologies, frameworks and languages by providing them advice of learning and prividing them resources for learning.
        only reply with the contents provided in the context and make sure to be supporting and sweet , always provide the url for the resource mentioned.
        <context>
        {context}
        <context>
        Questions: {input}
        """
    )

    main()

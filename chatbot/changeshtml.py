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

# css = ""
# with open("style.css", "r") as file:
#     css = file.read();

def load_css():
    with open("style.css", "r") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

# Define CSS styles
# st.markdown(f"""
# <style>
#     {css}
# </style>
# """, unsafe_allow_html=True)


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
    load_css()
    st.markdown('<div class="stHeader"><h1>Dev 10 Developer Learning Helper Chabot</h1></div>', unsafe_allow_html=True)

    if "embedding_done" not in st.session_state:
        st.session_state.embedding_done = False


    data = load_json_data('resources.json')

    if st.button('Load Resources and Create Embeddings') and not st.session_state.embedding_done:
        with st.spinner("Loading resources and creating embeddings..."):
            vector_embedding(data)
            st.success("Vector Store DB is ready")
            st.session_state.embedding_done = True

    if st.session_state.embedding_done:
        st.markdown('<div class="stHeader"><h2>Ask about anything you want to learn</h2></div>', unsafe_allow_html=True)

        prompt1 = st.text_input("Enter your question about learning recources")

        if prompt1:
            with st.spinner("Generating response..."):
                document_chain = create_stuff_documents_chain(llm, prompt)
                retriever = st.session_state.vectors.as_retriever()
                retrieval_chain = create_retrieval_chain(retriever, document_chain)
                start = time.process_time()
                response = retrieval_chain.invoke({'input': prompt1})
                st.info(f"Response time: {time.process_time() - start:.2f} seconds")
                st.write(response['answer'])

            with st.expander("Document Similarity Search"):
                for i, doc in enumerate(response["context"]):
                    st.markdown(f"**Document {i+1}**")
                    st.write(doc.page_content)
                    st.markdown("---")

if __name__ == '__main__':
    load_dotenv()
    groq_api_key = os.getenv('GROQ_API_KEY')
    os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")
    
    llm = ChatGroq(groq_api_key=groq_api_key, model_name="Llama3-8b-8192")
    prompt = ChatPromptTemplate.from_template(
        """
        Your name is Dev-10 Chatbot, you are a helping chatbot which helps developers learn technologies, frameworks, and languages by providing them advice and resources for learning.
        Only reply with the contents provided in the context and make sure to be supporting and sweet. Always provide the URL for the resource mentioned.
        <context>
        {context}
        </context>
        Questions: {input}
        """
    )

    main()



# import time

# import mesop as me


# @me.stateclass
# class State:
#   input: str
#   output: str
#   in_progress: bool


# @me.page(path="/starter_kit")
# def page():
#   with me.box(
#     style=me.Style(
#       background="#fff",
#       min_height="calc(100% - 48px)",
#       padding=me.Padding(bottom=16),
#     )
#   ):
#     with me.box(
#       style=me.Style(
#         width="min(720px, 100%)",
#         margin=me.Margin.symmetric(horizontal="auto"),
#         padding=me.Padding.symmetric(
#           horizontal=16,
#         ),
#       )
#     ):
#       header_text()
#       example_row()
#       chat_input()
#       output()
#   footer()


# def header_text():
#   with me.box(
#     style=me.Style(
#       padding=me.Padding(
#         top=64,
#         bottom=36,
#       ),
#     )
#   ):
#     me.text(
#       "Mesop Starter Kit",
#       style=me.Style(
#         font_size=36,
#         font_weight=700,
#         background="linear-gradient(90deg, #4285F4, #AA5CDB, #DB4437) text",
#         color="transparent",
#       ),
#     )


# EXAMPLES = [
#   "How to tie a shoe",
#   "Make a brownie recipe",
#   "Write an email asking for a sick day off",
# ]


# def example_row():
#   is_mobile = me.viewport_size().width < 640
#   with me.box(
#     style=me.Style(
#       display="flex",
#       flex_direction="column" if is_mobile else "row",
#       gap=24,
#       margin=me.Margin(bottom=36),
#     )
#   ):
#     for example in EXAMPLES:
#       example_box(example, is_mobile)


# def example_box(example: str, is_mobile: bool):
#   with me.box(
#     style=me.Style(
#       width="100%" if is_mobile else 200,
#       height=140,
#       background="#F0F4F9",
#       padding=me.Padding.all(16),
#       font_weight=500,
#       line_height="1.5",
#       border_radius=16,
#       cursor="pointer",
#     ),
#     key=example,
#     on_click=click_example_box,
#   ):
#     me.text(example)


# def click_example_box(e: me.ClickEvent):
#   state = me.state(State)
#   state.input = e.key


# def chat_input():
#   state = me.state(State)
#   with me.box(
#     style=me.Style(
#       padding=me.Padding.all(8),
#       background="white",
#       display="flex",
#       width="100%",
#       border=me.Border.all(
#         me.BorderSide(width=0, style="solid", color="black")
#       ),
#       border_radius=12,
#       box_shadow="0 10px 20px #0000000a, 0 2px 6px #0000000a, 0 0 1px #0000000a",
#     )
#   ):
#     with me.box(
#       style=me.Style(
#         flex_grow=1,
#       )
#     ):
#       me.native_textarea(
#         value=state.input,
#         autosize=True,
#         min_rows=4,
#         placeholder="Enter your prompt",
#         style=me.Style(
#           padding=me.Padding(top=16, left=16),
#           background="white",
#           outline="none",
#           width="100%",
#           overflow_y="auto",
#           border=me.Border.all(
#             me.BorderSide(style="none"),
#           ),
#         ),
#         on_blur=textarea_on_blur,
#       )
#     with me.content_button(type="icon", on_click=click_send):
#       me.icon("send")


# def textarea_on_blur(e: me.InputBlurEvent):
#   state = me.state(State)
#   state.input = e.value


# def click_send(e: me.ClickEvent):
#   state = me.state(State)
#   if not state.input:
#     return
#   state.in_progress = True
#   input = state.input
#   state.input = ""
#   yield

#   for chunk in call_api(input):
#     state.output += chunk
#     yield
#   state.in_progress = False
#   yield


# def call_api(input):
#   # Replace this with an actual API call
#   time.sleep(0.5)
#   yield "Example of streaming an output"
#   time.sleep(1)
#   yield "\n\nOutput: " + input


# def output():
#   state = me.state(State)
#   if state.output or state.in_progress:
#     with me.box(
#       style=me.Style(
#         background="#F0F4F9",
#         padding=me.Padding.all(16),
#         border_radius=16,
#         margin=me.Margin(top=36),
#       )
#     ):
#       if state.output:
#         me.markdown(state.output)
#       if state.in_progress:
#         with me.box(style=me.Style(margin=me.Margin(top=16))):
#           me.progress_spinner()


# def footer():
#   with me.box(
#     style=me.Style(
#       position="sticky",
#       bottom=0,
#       padding=me.Padding.symmetric(vertical=16, horizontal=16),
#       width="100%",
#       background="#F0F4F9",
#       font_size=14,
#     )
#   ):
#     me.html(
#       "Made with <a href='https://google.github.io/mesop/'>Mesop</a>",
#     )
import streamlit as st
import json
import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
groq_api = os.getenv("GROQ_API_KEY")
client = Groq(
    api_key=groq_api,
)

ideal_json = """
{
    "language": "language name",
    "title" : "language Roadmap",
    "Description" : "Language Learning Roadmap 10 Steps",
    "stepsSchema" : [
        {
            "title" : "step 1",
            "Description" : "Description of step 1",
            "difficultyLevel" : "beginner"
        },
        {
            "title" : "step 2",
            "Description" : "Description of step 2",
            "difficultyLevel" : "beginner"
        },
        {
            "title" : "step 3",
            "Description" : "Description of step 3",
            "difficultyLevel" : "intermediate"
        }
        ....... more steps accordingly
    ]
}
"""

example_json = """
{
    "language": "C",
    "title" : "C Language Roadmap",
    "Description" : "C Language Learning Roadmap 10 Steps",
    "stepsSchema" : [
        {
            "title" : "Step 1: Setting up the Environment",
            "Description" : "Install a C compiler, setup a code editor, and write your first C program",
            "difficultyLevel" : "beginner"
        },
        {
            "title" : "Step 2: Basic Syntax and Data Types",
            "Description" : "Learn basic syntax, data types, variables, and operators in C",
            "difficultyLevel" : "beginner"
        },
        {
            "title" : "Step 3: Control Structures",
            "Description" : "Learn if-else statements, switch statements, loops, and jump statements",
            "difficultyLevel" : "beginner"
        },
        {
            "title" : "Step 4: Functions",
            "Description" : "Learn how to declare and use functions in C",
            "difficultyLevel" : "beginner"
        },
        {
            "title" : "Step 5: Arrays and Strings",
            "Description" : "Learn how to work with arrays and strings in C",
            "difficultyLevel" : "intermediate"
        },
        {
            "title" : "Step 6: Pointers",
            "Description" : "Learn how to use pointers in C",
            "difficultyLevel" : "intermediate"
        },
        {
            "title" : "Step 7: Structures and Unions",
            "Description" : "Learn how to work with structures and unions in C",
            "difficultyLevel" : "intermediate"
        },
        {
            "title" : "Step 8: File Input/Output",
            "Description" : "Learn how to read and write files in C",
            "difficultyLevel" : "intermediate"
        },
        {
            "title" : "Step 9: Dynamic Memory Allocation",
            "Description" : "Learn how to dynamically allocate memory using malloc, calloc, and realloc",
            "difficultyLevel" : "advanced"
        },
        {
            "title" : "Step 10: Project Development",
            "Description" : "Develop a project that incorporates all the concepts learned in the previous steps",
            "difficultyLevel" : "advanced"
        }
    ]
}
"""

class generate_json:
    def __init__(self):
        self.ideal_json = ideal_json
        self.example = example_json
        self.language = "React Framework"
        self.prompt = f"""
            you are a roadmap generator, you have to generate a json structure for roadmap for learning {self.language}
            below is the ideal structure for the json you have to generate, make sure that the difficulty level is between Beginner/Intermediate/Advanced
            {self.ideal_json}
            below is an example of how the output should look like 
            {self.example}
            Only generate the json output so tha it can be parsed, do not write any other text or information
        """

    def generate_json(self):
        chat_completion = client.chat.completions.create(
            messages = [
                {
                    "role" : "user",
                    "content" : self.prompt,
                }
            ],
            model = "llama3-70b-8192",
        )
        json_roadmap_structure = chat_completion.choices[0].message.content.strip()
        print(json_roadmap_structure)

if __name__ == "__main__":
    gn = generate_json()
    gn.generate_json()


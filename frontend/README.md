## NexusFlow: Modular Pipeline Builder
NexusFlow is a full-stack, node-based workflow orchestrator designed for scalability and high-performance data processing. It features a custom React abstraction for dynamic UI components and a FastAPI backend for complex graph validation.

## Note: This project was originally developed as part of a technical assessment for VectorShift. The implementation focuses on solving code duplication through high-level frontend abstractions and ensuring pipeline integrity via Directed Acyclic Graph (DAG) analysis.

## 🚀 Key Features
->Modular Node Abstraction: Built on a BaseNode "Single Source of Truth," allowing new node types (LLM, Auth, Logic, etc.) to be deployed in minutes with inherited styling and handle logic.

->Dynamic Variable Parser: A real-time, Regex-based text parser that automatically generates input handles on nodes when users define variables using {{variable}} syntax.

->2b Layout Aesthetic: A refined, professional UI featuring consistent internal gutters, structured data grids, and a high-contrast dark-mode workspace.

->Graph Validation Engine: Integrated with a FastAPI backend to perform real-time cycle detection, ensuring all pipelines are valid Directed Acyclic Graphs (DAGs).

->Advanced Navigation: Includes a 3x3 Legend and a color-coded MiniMap for navigating complex, large-scale pipelines.

## 🛠️ Technical Stack
->Frontend: React.js, React Flow, Zustand (State Management), Tailwind CSS/CSS3.

->Backend: Python, FastAPI, Uvicorn.

->Architecture: Modular Component Design, React Portals, Functional Programming.

## 🏗️ Getting Started
->Prerequisites
    1. Node.js (v16+)

    2. Python 3.9+

->Frontend Setup
    1. Navigate to the /frontend directory.

    2. Install dependencies: npm install
    
    3. Start the development server: npm start

->Backend Setup
    1. Navigate to the /backend directory.

    2. Install requirements:pip install -r requirements.txt

    3. Run the FastAPI server:python -m uvicorn main:app --reload --port 8000

## 🧪 How to Test the DAG Logic
->Drag multiple nodes onto the canvas.

->Connect them in a sequence (e.g., Input -> LLM -> Output).

->Click Submit to see the "Is DAG: Yes" confirmation.

->Deliberately create a cycle (connect an output back to a previous input) and click Submit.

->The system will flag the error and display "Is DAG: NO" in the analysis modal.

## 📝 License
This project is open-sourced under the MIT License.
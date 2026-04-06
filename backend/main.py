from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict, deque

app = FastAPI()

# Essential: Allow your React app to send data to Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/pipelines/parse')
async def parse_pipeline(request: Request):
    data = await request.json()
    nodes = data.get('nodes', [])
    edges = data.get('edges', [])

    # Graph Logic: Detect loops (Cycles)
    adj = defaultdict(list)
    in_degree = {node['id']: 0 for node in nodes}
    for edge in edges:
        u, v = edge['source'], edge['target']
        adj[u].append(v)
        in_degree[v] = in_degree.get(v, 0) + 1

    queue = deque([n for n in in_degree if in_degree[n] == 0])
    visited_count = 0
    while queue:
        u = queue.popleft()
        visited_count += 1
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)

    return {
        'num_nodes': len(nodes),
        'num_edges': len(edges),
        'is_dag': visited_count == len(nodes)
    }
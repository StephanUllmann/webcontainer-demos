import matplotlib.pyplot as plt
import networkx as nx


# Helper function to "print" trees
def draw_tree(tree):
    graph = nx.DiGraph()
    pos = {}

    # in walks from node to node, by recursively calling the children of a node
    # then it adds coordinates where to draw the shapes
    def add_edges(node, x=0, y=0, layer=1):
        if node is not None:
            graph.add_node(node.value)
            pos[node.value] = (x, y)
            if node.left:
                graph.add_edge(node.value, node.left.value)
                add_edges(node.left, x - 1 / 2**layer, y - 1, layer + 1)
            if node.right:
                graph.add_edge(node.value, node.right.value)
                add_edges(node.right, x + 1 / 2**layer, y - 1, layer + 1)

    add_edges(tree.root)

    plt.figure(figsize=(8, 5))
    nx.draw(
        graph,
        pos,
        with_labels=True,
        node_size=1000,
        node_color="green",
        font_size=7,
        font_weight="bold",
        arrows=False,
    )
    plt.show()

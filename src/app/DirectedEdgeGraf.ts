// input is a list of nodeIds dependencies on eachother
// output findValidOrdering()

export class DirectedEdgeGraf {
  private listOfNextNodesByNodeIds: {
    [key: string]: string[];
  };

  private marked: {
    [key: string]: boolean;
  };

  private finished: {
    [key: string]: boolean;
  };

  private order: string[] = [];

  constructor(input?: string) {
    if (input) {
      this.generateValidOrderingFromInput(input);
    }
  }

  private processRelation({
    nodeIdFrom,
    nodeIdTo
  }: {
    nodeIdFrom: string;
    nodeIdTo: string;
  }): void {
    if (!nodeIdFrom) {
      return;
    }

    if (!this.listOfNextNodesByNodeIds[nodeIdFrom]) {
      this.listOfNextNodesByNodeIds[nodeIdFrom] = [];
      this.marked[nodeIdFrom] = false;
      this.finished[nodeIdFrom] = false;
    }

    if (!nodeIdTo) {
      return;
    }

    if (!this.listOfNextNodesByNodeIds[nodeIdTo]) {
      this.listOfNextNodesByNodeIds[nodeIdTo] = [];
      this.marked[nodeIdTo] = false;
      this.finished[nodeIdTo] = false;
    }

    this.listOfNextNodesByNodeIds[nodeIdFrom].push(nodeIdTo);
  }

  private parseInput(
    input: string,
    releationDelimiter: string,
    nodeIdDelimiter: string
  ) {
    if (!input) {
      throw new Error("No input is provided!");
    }

    if (!releationDelimiter) {
      throw new Error("Can not parse input without releation delimiter!");
    }

    if (!nodeIdDelimiter) {
      throw new Error("Can not parse input without nodeId delimiter!");
    }

    this.listOfNextNodesByNodeIds = {};
    this.marked = {};
    this.finished = {};

    input.split(releationDelimiter).forEach(relation => {
      const temp = relation.split(nodeIdDelimiter);

      this.processRelation({
        nodeIdFrom: temp[0],
        nodeIdTo: temp[1]
      });
    });
  }

  private dfs(nodeId: string): void {
    this.marked[nodeId] = true;

    this.listOfNextNodesByNodeIds[nodeId].forEach(listOfRelatedNodeId => {
      if (!this.marked[listOfRelatedNodeId]) {
        this.dfs(listOfRelatedNodeId);
      } else if (this.order.indexOf(listOfRelatedNodeId) === -1) {
        throw new Error("There is a cyclical relation. ");
      }
    });

    if (!this.finished[nodeId]) {
      this.order.push(nodeId);
      this.finished[nodeId] = true;
    }
  }

  private generateValidOrdering(): void {
    this.order.length = 0;

    for (const nodeId in this.listOfNextNodesByNodeIds) {
      if (!this.marked[nodeId]) {
        this.dfs(nodeId);
      }
    }

    this.listOfNextNodesByNodeIds = null;
    this.marked = null;
    this.finished = null;
  }

  generateValidOrderingFromInput(
    input: string,
    releationDelimiter: string = ",",
    nodeIdDelimiter: string = "->"
  ) {
    this.parseInput(input, releationDelimiter, nodeIdDelimiter);

    this.generateValidOrdering();
  }

  findValidOrdering(): string[] {
    return this.order.reverse();
  }
}


import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Pencil, 
  Trash2, 
  Check, 
  X, 
  Plus 
} from "lucide-react";
import { queryApi, purchasedAgentApi } from "@/lib/api";
import { PurchasedAgent, Query } from "@/lib/types";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const SampleQuestions = () => {
  const { user } = useAuth();
  const [purchasedAgents, setPurchasedAgents] = useState<PurchasedAgent[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string>("");
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingQuery, setEditingQuery] = useState<Query | null>(null);
  const [queryText, setQueryText] = useState<string>("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false);
  const [queryToDelete, setQueryToDelete] = useState<string>("");
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  const [newQuery, setNewQuery] = useState<string>("");

  // Fetch purchased agents
  useEffect(() => {
    const fetchPurchasedAgents = async () => {
      if (!user?.company_id) return;
      
      try {
        const response = await purchasedAgentApi.getPurchasedAgents(user.company_id);
        const purchased = Array.isArray(response) ? response : 
                         (response.purchasedAgents && Array.isArray(response.purchasedAgents)) ? 
                         response.purchasedAgents : [];
        setPurchasedAgents(purchased);
        
        // Set first agent as selected by default if there are any
        if (purchased.length > 0) {
          const firstAgentId = purchased[0].id || purchased[0]._id;
          setSelectedAgentId(firstAgentId);
        }
      } catch (error) {
        console.error("Error fetching purchased agents:", error);
        toast.error("Failed to load agents");
      }
    };

    fetchPurchasedAgents();
  }, [user]);

  // Fetch queries for selected agent
  useEffect(() => {
    const fetchQueries = async () => {
      if (!selectedAgentId) return;
      
      setLoading(true);
      try {
        const response = await queryApi.getQueries(selectedAgentId);
        setQueries(response);
      } catch (error) {
        console.error("Error fetching queries:", error);
        toast.error("Failed to load sample questions");
        setQueries([]);
      } finally {
        setLoading(false);
      }
    };

    if (selectedAgentId) {
      fetchQueries();
    }
  }, [selectedAgentId]);

  const handleAgentChange = (value: string) => {
    setSelectedAgentId(value);
  };

  const handleEditStart = (query: Query) => {
    setEditingQuery(query);
    setQueryText(query.query);
  };

  const handleEditCancel = () => {
    setEditingQuery(null);
    setQueryText("");
  };

  const handleEditSave = async () => {
    if (!editingQuery) return;
    
    try {
      await queryApi.updateQuery(editingQuery.id, { query: queryText });
      
      // Update local state
      setQueries(prev => 
        prev.map(q => q.id === editingQuery.id ? { ...q, query: queryText } : q)
      );
      
      toast.success("Question updated successfully");
      setEditingQuery(null);
      setQueryText("");
    } catch (error) {
      console.error("Error updating query:", error);
      toast.error("Failed to update question");
    }
  };

  const openDeleteConfirm = (id: string) => {
    setQueryToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!queryToDelete) return;
    
    try {
      await queryApi.deleteQuery(queryToDelete);
      
      // Update local state
      setQueries(prev => prev.filter(q => q.id !== queryToDelete));
      
      toast.success("Question deleted successfully");
      setDeleteConfirmOpen(false);
      setQueryToDelete("");
    } catch (error) {
      console.error("Error deleting query:", error);
      toast.error("Failed to delete question");
    }
  };

  const handleAddQuery = async () => {
    if (!selectedAgentId || !newQuery || !user?.company_id) return;
    
    try {
      const selectedAgent = purchasedAgents.find(a => (a.id === selectedAgentId || a._id === selectedAgentId));
      if (!selectedAgent) return;
      
      const response = await queryApi.createQuery({
        query: newQuery,
        company_id: user.company_id,
        agent_id: selectedAgent.agent_id,
        purchased_agent_id: selectedAgentId
      });
      
      // Update local state
      setQueries(prev => [...prev, response]);
      
      toast.success("Question added successfully");
      setAddDialogOpen(false);
      setNewQuery("");
    } catch (error) {
      console.error("Error adding query:", error);
      toast.error("Failed to add question");
    }
  };

  const getAgentName = (id: string) => {
    const agent = purchasedAgents.find(a => a.id === id || a._id === id);
    return agent?.name || agent?.agent?.name || "Unknown Agent";
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Sample Questions</h1>
        <p className="text-muted-foreground">Manage training questions for your AI agents</p>
      </div>
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Manage Questions</CardTitle>
          <CardDescription>
            Create, edit and delete sample questions that your agents will be trained on
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="w-64">
              <Select value={selectedAgentId} onValueChange={handleAgentChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an agent" />
                </SelectTrigger>
                <SelectContent>
                  {purchasedAgents.map((agent) => (
                    <SelectItem 
                      key={agent.id || agent._id} 
                      value={agent.id || agent._id || ""}
                    >
                      {agent.name || agent.agent?.name || `Agent ${agent.agent_id.slice(0, 5)}...`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={() => setAddDialogOpen(true)} 
              disabled={!selectedAgentId}
              className="flex items-center gap-1"
            >
              <Plus size={16} />
              Add Question
            </Button>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              {Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : queries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No sample questions found for this agent
              </p>
              <Button 
                onClick={() => setAddDialogOpen(true)}
                variant="outline"
              >
                Add your first question
              </Button>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80%]">Question</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queries.map((query) => (
                    <TableRow key={query.id}>
                      <TableCell>
                        {editingQuery?.id === query.id ? (
                          <Input
                            value={queryText}
                            onChange={(e) => setQueryText(e.target.value)}
                            className="w-full"
                          />
                        ) : (
                          <span>{query.query}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {editingQuery?.id === query.id ? (
                          <div className="flex justify-end gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={handleEditCancel}
                            >
                              <X size={16} />
                            </Button>
                            <Button
                              size="icon"
                              onClick={handleEditSave}
                            >
                              <Check size={16} />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleEditStart(query)}
                            >
                              <Pencil size={16} />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => openDeleteConfirm(query.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Question</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this question? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Question Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Sample Question</DialogTitle>
            <DialogDescription>
              Add a new sample question for {getAgentName(selectedAgentId)}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Enter your sample question here..."
              value={newQuery}
              onChange={(e) => setNewQuery(e.target.value)}
              className="min-h-24"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddQuery} disabled={!newQuery.trim()}>
              Add Question
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SampleQuestions;

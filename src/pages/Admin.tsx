import { useState, useEffect } from 'react';
import { 
  ClipboardList, Search, Eye, Filter, RefreshCw, 
  Trash2, Phone, Calendar, BookOpen, CheckCircle, 
  X, Check, HelpCircle, Save, Award, TrendingUp, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  grade: string;
  subject: string;
  message: string;
  type: string;
  status: 'Pending' | 'Called' | 'Admitted' | 'Closed' | string;
  notes: string;
  createdAt: string;
}

export function Admin() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  
  // Edit notes state
  const [editingNotes, setEditingNotes] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Fetch inquiries from server
  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/inquiries');
      if (response.ok) {
        const data = await response.json();
        setInquiries(data);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // Update inquiry status or notes
  const handleUpdateInquiry = async (id: string, newStatus?: string, newNotes?: string) => {
    try {
      const payload: any = {};
      if (newStatus !== undefined) payload.status = newStatus;
      if (newNotes !== undefined) payload.notes = newNotes;

      const response = await fetch(`/api/inquiries/${id}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setFeedbackMsg('Inquiry updated successfully!');
        fetchInquiries();
        
        // Refresh selected details pane if visible
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({
            ...selectedInquiry,
            ...(newStatus !== undefined && { status: newStatus }),
            ...(newNotes !== undefined && { notes: newNotes }),
          });
        }
        
        setTimeout(() => setFeedbackMsg(''), 3000);
      }
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  // Delete an inquiry
  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    
    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setInquiries(inquiries.filter(item => item.id !== id));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(null);
        }
        setFeedbackMsg('Inquiry deleted successfully!');
        setTimeout(() => setFeedbackMsg(''), 3000);
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  const handleOpenDetails = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setEditingNotes(inq.notes || '');
    setUpdatingStatus(inq.status || 'Pending');
  };

  // Compute key stats
  const totalLeads = inquiries.length;
  const pendingLeads = inquiries.filter(i => i.status === 'Pending').length;
  const admittedLeads = inquiries.filter(i => i.status === 'Admitted').length;
  const conversionRate = totalLeads ? Math.round((admittedLeads / totalLeads) * 100) : 0;

  // Filter inquiries
  const filteredInquiries = inquiries.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.grade.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="w-full bg-[#fcf8f2] min-h-screen py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-black text-[#8fae6a] flex items-center gap-3">
              <ClipboardList className="w-10 h-10" />
              Inquiries Desk
            </h1>
            <p className="text-gray-600 font-medium mt-2">
              Staff Portal to track student admissions, demo class requests, and counselor submissions.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button 
              onClick={fetchInquiries}
              className="bg-white hover:bg-[#f2eadc] text-[#8fae6a] font-heading font-semibold hover:border-[#8fae6a] border-2 border-[#e8eddc] px-4 py-2.5 rounded-full flex items-center gap-2 transition-all shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-[#f0c8e1] border-2 border-white rounded-[30px] p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[#8c4f73] uppercase tracking-wider">Total leads</p>
              <h3 className="text-3xl font-heading font-black text-[#4a4a4a] mt-1">{totalLeads}</h3>
            </div>
            <div className="w-12 h-12 bg-white/40 rounded-2xl flex items-center justify-center text-[#cc72ac]">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#f6e191] border-2 border-white rounded-[30px] p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[#8c7418] uppercase tracking-wider">Pending Calls</p>
              <h3 className="text-3xl font-heading font-black text-[#4a4a4a] mt-1">{pendingLeads}</h3>
            </div>
            <div className="w-12 h-12 bg-white/40 rounded-2xl flex items-center justify-center text-[#d7b224]">
              <Phone className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#d9ecd3] border-2 border-white rounded-[30px] p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[#4e6a3c] uppercase tracking-wider">Admitted Students</p>
              <h3 className="text-3xl font-heading font-black text-[#4a4a4a] mt-1">{admittedLeads}</h3>
            </div>
            <div className="w-12 h-12 bg-white/40 rounded-2xl flex items-center justify-center text-[#8fae6a]">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-[#d2def3] border-2 border-white rounded-[30px] p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[#3c567a] uppercase tracking-wider">Conversion rate</p>
              <h3 className="text-3xl font-heading font-black text-[#4a4a4a] mt-1">{conversionRate}%</h3>
            </div>
            <div className="w-12 h-12 bg-white/40 rounded-2xl flex items-center justify-center text-[#779dda]">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Feedback Message */}
        {feedbackMsg && (
          <div className="bg-[#d9ecd3] border-2 border-[#8fae6a] text-gray-800 font-bold px-6 py-3 rounded-2xl mb-6 shadow-sm text-center">
            {feedbackMsg}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Inquiries Table/List Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Search/Filter Bar */}
            <div className="bg-white p-6 rounded-[30px] border-4 border-[#f2eadc] shadow-sm flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search by name, phone, class, or subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#fcf8f2] border-2 border-[#e8eddc] rounded-2xl pl-12 pr-4 py-3 text-sm focus:border-[#8fae6a] outline-none font-medium text-gray-700"
                />
              </div>

              <div className="flex gap-2">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-white border-2 border-[#e8eddc] rounded-2xl px-3 py-3 text-sm font-bold text-gray-600 focus:border-[#8fae6a] outline-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Called">Called</option>
                  <option value="Admitted">Admitted</option>
                  <option value="Closed">Closed</option>
                </select>

                <select 
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="bg-white border-2 border-[#e8eddc] rounded-2xl px-3 py-3 text-sm font-bold text-gray-600 focus:border-[#8fae6a] outline-none cursor-pointer"
                >
                  <option value="All font-bold">All Forms</option>
                  <option value="Demo Class Request">Demo Class</option>
                  <option value="General Query Contact">Contact Queries</option>
                </select>
              </div>
            </div>

            {/* Inquiries List */}
            <div className="bg-white rounded-[40px] border-4 border-[#f2eadc] shadow-sm overflow-hidden">
              {loading ? (
                <div className="text-center py-20 flex flex-col items-center justify-center">
                  <RefreshCw className="w-12 h-12 text-[#8fae6a] animate-spin mb-4" />
                  <p className="font-heading font-black text-xl text-gray-600">Loading Inquiries...</p>
                </div>
              ) : filteredInquiries.length === 0 ? (
                <div className="text-center py-20 px-4">
                  <div className="w-16 h-16 bg-[#fcf8f2] rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#e8eddc]">
                    <HelpCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-heading font-black text-2xl text-[#4a4a4a] mb-2">No inquiries found</h3>
                  <p className="text-gray-500 font-medium max-w-md mx-auto">
                    Try checking with other filters or search query, or register a new study request on the Admission page.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#fcf8f2] border-b-2 border-[#f2eadc] text-xs font-black uppercase text-gray-500 tracking-wider">
                        <th className="py-4 px-6">Source / Student</th>
                        <th className="py-4 px-6 md:table-cell hidden">Grade & Subject</th>
                        <th className="py-4 px-6">Phone</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f2eadc]">
                      {filteredInquiries.map((inq) => (
                        <tr 
                          key={inq.id} 
                          className={`hover:bg-[#fcf8f2]/60 transition-colors cursor-pointer ${selectedInquiry?.id === inq.id ? 'bg-[#e8eddc]/40 font-semibold' : ''}`}
                          onClick={() => handleOpenDetails(inq)}
                        >
                          <td className="py-5 px-6">
                            <div className="flex flex-col">
                              <span className="font-heading font-bold text-lg text-gray-800 leading-tight">{inq.name}</span>
                              <span className="text-xs font-bold text-gray-400 mt-0.5">{inq.type}</span>
                            </div>
                          </td>
                          <td className="py-5 px-6 md:table-cell hidden">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-gray-700">Class {inq.grade}</span>
                              <span className="text-xs text-gray-500 italic mt-0.5 max-w-[150px] truncate">{inq.subject}</span>
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <a 
                              href={`tel:${inq.phone}`} 
                              onClick={(e) => e.stopPropagation()} 
                              className="text-sm font-bold text-gray-600 hover:text-[#8fae6a] transition-all flex items-center gap-1.5"
                            >
                              <Phone className="w-3.5 h-3.5 text-[#8fae6a]" />
                              {inq.phone}
                            </a>
                          </td>
                          <td className="py-5 px-6">
                            <span className={`inline-block text-[11px] font-black uppercase px-3 py-1 rounded-full ${
                              inq.status === 'Admitted' ? 'bg-[#d9ecd3] text-[#4e6a3c] border border-[#a6cf98]' :
                              inq.status === 'Called' ? 'bg-[#d2def3] text-[#3c567a] border border-[#9cb7df]' :
                              inq.status === 'Closed' ? 'bg-[#f2eadc] text-gray-500 border border-gray-300' :
                              'bg-[#f6e191] text-[#8c7418] border border-[#e2c768]'
                            }`}>
                              {inq.status}
                            </span>
                          </td>
                          <td className="py-5 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => handleOpenDetails(inq)} 
                                className="p-1.5 bg-[#fcf8f2] border border-[#e8eddc] text-gray-500 hover:text-[#8fae6a] hover:border-[#8fae6a] rounded-lg transition-all"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteInquiry(inq.id)} 
                                className="p-1.5 bg-[#fcf8f2] border border-[#e8eddc] text-gray-400 hover:text-red-500 hover:border-red-300 rounded-lg transition-all"
                                title="Delete inquiry"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Inquiry Details Side-Pane Column */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {selectedInquiry ? (
                <motion.div 
                  key={selectedInquiry.id}
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-white rounded-[40px] border-4 border-[#f2eadc] shadow-sm overflow-hidden sticky top-28 p-6 md:p-8"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-heading font-black text-gray-800 leading-tight">Details Summary</h2>
                    <button 
                      onClick={() => setSelectedInquiry(null)}
                      className="p-1.5 hover:bg-[#fcf8f2] text-gray-400 hover:text-gray-600 rounded-full transition-colors border border-transparent hover:border-[#e8eddc]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <span className="text-[11px] font-black uppercase text-[#8fae6a] tracking-wider block">Student Name</span>
                      <p className="text-lg font-bold text-gray-800 mt-1">{selectedInquiry.name}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[11px] font-black uppercase text-[#8fae6a] tracking-wider block">Phone Number</span>
                        <a href={`tel:${selectedInquiry.phone}`} className="inline-flex items-center gap-1.5 text-base font-bold text-gray-700 hover:text-indigo-600 mt-1">
                          <Phone className="w-4 h-4 text-[#8fae6a]" />
                          {selectedInquiry.phone}
                        </a>
                      </div>
                      <div>
                        <span className="text-[11px] font-black uppercase text-[#8fae6a] tracking-wider block">Class / Grade</span>
                        <p className="text-base font-bold text-gray-700 mt-1">Class {selectedInquiry.grade}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[11px] font-black uppercase text-[#8fae6a] tracking-wider block">Subjects</span>
                        <p className="text-base font-bold text-gray-700 mt-1">{selectedInquiry.subject}</p>
                      </div>
                      <div>
                        <span className="text-[11px] font-black uppercase text-[#8fae6a] tracking-wider block">Submitted Date</span>
                        <p className="text-sm font-semibold text-gray-500 mt-1">
                          {new Date(selectedInquiry.createdAt).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-black uppercase text-[#8fae6a] tracking-wider block">Student Message</span>
                      <p className="text-sm font-semibold bg-[#fcf8f2] p-4 rounded-2xl border-2 border-[#e8eddc] text-gray-700 mt-1 leading-relaxed">
                        {selectedInquiry.message || "No custom message or inquiry reasons entered."}
                      </p>
                    </div>

                    <hr className="border-[#f2eadc]" />

                    {/* Quick convert tools */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-[11px] font-black uppercase text-[#8fae6a] tracking-wider block mb-2">Update Stage</label>
                        <div className="grid grid-cols-2 gap-2">
                          {['Pending', 'Called', 'Admitted', 'Closed'].map((s) => (
                            <button
                              key={s}
                              onClick={() => {
                                setUpdatingStatus(s);
                                handleUpdateInquiry(selectedInquiry.id, s, undefined);
                              }}
                              className={`py-2 px-3 text-xs font-black uppercase rounded-xl border transition-all text-center ${
                                updatingStatus === s 
                                  ? 'bg-[#8fae6a] border-[#8fae6a] text-white shadow-sm' 
                                  : 'bg-white hover:bg-[#fcf8f2] text-gray-600 border-[#e8eddc]'
                              }`}
                            >
                              {s === 'Admitted' && <Check className="w-3.5 h-3.5 inline mr-1" />}
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-black uppercase text-[#8fae6a] tracking-wider block mb-1.5">Advisor Notes (Follow ups)</label>
                        <textarea
                          rows={3}
                          value={editingNotes}
                          onChange={(e) => setEditingNotes(e.target.value)}
                          placeholder="Add teacher remarks, scheduled timings, or parent callback details..."
                          className="w-full bg-[#fcf8f2] border-2 border-[#e8eddc] rounded-2xl px-3 py-2 text-sm focus:border-[#8fae6a] outline-none font-medium text-gray-700 resize-none"
                        ></textarea>
                        
                        <button
                          onClick={() => handleUpdateInquiry(selectedInquiry.id, undefined, editingNotes)}
                          className="mt-2 w-full bg-[#8fae6a] hover:bg-[#7b9858] text-white font-heading font-black text-xs uppercase py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                        >
                          <Save className="w-3.5 h-3.5" />
                          Save Remarks
                        </button>
                      </div>
                    </div>

                  </div>
                </motion.div>
              ) : (
                <div className="h-48 border-4 border-dashed border-[#dcd1ba] rounded-[40px] flex flex-col items-center justify-center text-center p-6 text-gray-500 bg-[#fbf9f6]">
                  <HelpCircle className="w-8 h-8 text-gray-300 mb-2" />
                  <p className="text-sm font-bold">Select any entry in the desk to view conversations, schedule callback details, or change stages.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}

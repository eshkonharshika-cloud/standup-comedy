"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Save, Layout, MessageSquare, Star, Zap, ShoppingBag, Video, Search, Megaphone } from "lucide-react";

interface UniversalEditorProps {
    initialAllData: any;
}

interface SelectedField {
    itemIndex: number;
    fieldName: string;
}

type ComponentType = 'bento' | 'hero' | 'faq' | 'faqStats' | 'testimonial' | 'capabilities' | 'productReleases' | 'featureVideo' | 'discover';

const COMPONENT_LABELS: Record<ComponentType, { label: string, icon: any }> = {
    hero: { label: "Hero Section", icon: Megaphone },
    bento: { label: "Bento Grid", icon: Layout },
    faq: { label: "FAQ List", icon: MessageSquare },
    faqStats: { label: "FAQ Stats", icon: Layout }, // Using layout icon for stats cards
    testimonial: { label: "Testimonials", icon: Star },
    capabilities: { label: "Capabilities", icon: Zap },
    productReleases: { label: "Product Releases", icon: ShoppingBag },
    featureVideo: { label: "Feature Video", icon: Video },
    discover: { label: "Discover Section", icon: Search },
};

const DEFAULT_ALL_DATA = {
    hero: {
        eyebrow: "Enterprise Analytics",
        title: "Make smarter real estate decisions",
        description: "Altus Group delivers intelligence, analytics, and expertise to help CRE leaders act with confidence."
    },
    bento: {
        cards: [
            {
                label: "Analytics",
                title: "ARGUS Intelligence",
                description: "Industry-leading CRE analytics and forecasting powered by market data.",
                imageUrl: "/images/bento/intelligence.png"
            },
            {
                label: "Valuation",
                title: "ARGUS Enterprise",
                description: "Cash-flow forecasting and valuation trusted by global investors.",
                imageUrl: "/images/bento/enterprise.png"
            },
            {
                label: "Development",
                title: "EstateMaster",
                description: "End-to-end property development feasibility modelling.",
                imageUrl: "/images/bento/estatemaster.png"
            },
            {
                label: "Data",
                title: "Reonomy",
                description: "Property intelligence platform delivering ownership and transaction data.",
                imageUrl: "/images/bento/reonomy.png"
            }
        ]
    },
    discover: {
        valueProps: [
            { title: "Data-driven decisions", subtitle: "Leverage market intelligence and predictive analytics to reduce risk." },
            { title: "Trusted by leaders", subtitle: "Used by top CRE investors, developers, and lenders worldwide." },
            { title: "Built for scale", subtitle: "Enterprise-grade solutions supporting portfolios of any size." }
        ]
    },
    capabilities: {
        capabilities: [
            { title: "Market Forecasting", description: "Understand future market movements with scenario-based forecasting." },
            { title: "Asset Valuation", description: "Model cash flows, returns, and valuations with institutional accuracy." },
            { title: "Portfolio Intelligence", description: "Analyze performance across assets, sectors, and geographies." }
        ]
    },
    featureVideo: {
        eyebrow: "Platform Overview",
        title: "See Altus Group in action",
        description: "Discover how our solutions power the world’s most sophisticated real estate decisions."
    },
    productReleases: {
        releases: [
            { title: "ARGUS Enterprise", versions: "v12.3", date: "Jan 2026" },
            { title: "ARGUS Intelligence", versions: "Q1 2026 Update", date: "Feb 2026" },
            { title: "EstateMaster", versions: "v8.1", date: "Dec 2025" }
        ]
    },
    faqStats: {
        stats: [
            { label: "Global clients", value: "4,000+" },
            { label: "Countries served", value: "80+" },
            { label: "Years of expertise", value: "30+" }
        ]
    },
    faq: {
        faqs: [
            { question: "What is ARGUS Enterprise used for?", answer: "ARGUS Enterprise is used for cash-flow forecasting, valuation, and portfolio analysis across commercial real estate assets." },
            { question: "Who uses Altus Group products?", answer: "Our products are used by investors, developers, lenders, asset managers, and advisors globally." },
            { question: "Is training available?", answer: "Yes. We offer onboarding, certification programs, and ongoing learning resources." }
        ]
    },
    testimonial: {
        quote: "Altus Group has transformed the way we evaluate risk and opportunity across our global portfolio.",
        authorName: "Sarah Mitchell",
        authorRole: "Head of Investments, Global RE Firm"
    }
};

export default function UniversalEditor({ initialAllData }: UniversalEditorProps) {
    const router = useRouter();
    const [selectedComponent, setSelectedComponent] = useState<ComponentType>('bento');
    const [allData, setAllData] = useState(initialAllData || DEFAULT_ALL_DATA);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [selectedField, setSelectedField] = useState<SelectedField | null>(null);
    const [editingField, setEditingField] = useState<SelectedField | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isMappingMode, setIsMappingMode] = useState(false);
    const [mappings, setMappings] = useState<Record<string, string>>({}); // TargetPath -> SourcePath
    const editInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    // Initialize from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("universal-editor-data");
        const savedMappings = localStorage.getItem("universal-editor-mappings");

        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setAllData({ ...DEFAULT_ALL_DATA, ...parsed });
            } catch (e) {
                console.error("Failed to load saved data", e);
            }
        }

        if (savedMappings) {
            try {
                setMappings(JSON.parse(savedMappings));
            } catch (e) {
                console.error("Failed to load saved mappings", e);
            }
        }
    }, []);

    // Auto-save to localStorage
    useEffect(() => {
        localStorage.setItem("universal-editor-data", JSON.stringify(allData));
        localStorage.setItem("universal-editor-mappings", JSON.stringify(mappings));
    }, [allData, mappings]);

    useEffect(() => {
        if (editingField && editInputRef.current) {
            editInputRef.current.focus();
        }
    }, [editingField]);

    // Helper to get items and fields configuration for the current component
    const getConfig = (type: ComponentType) => {
        const data = allData[type];
        switch (type) {
            case 'bento':
                return {
                    items: data.cards || [],
                    fields: [
                        { key: 'label', label: 'Label', type: 'text', style: 'text-[10px] font-black uppercase tracking-widest text-blue-600' },
                        { key: 'title', label: 'Title', type: 'text', style: 'text-xl font-black text-slate-800' },
                        { key: 'description', label: 'Description', type: 'textarea', style: 'text-xs font-medium text-slate-500' },
                        { key: 'imageUrl', label: 'Image URL', type: 'text', isImage: true }
                    ]
                };
            case 'faq':
                return {
                    items: data.faqs || [],
                    fields: [
                        { key: 'question', label: 'Question', type: 'text', style: 'text-lg font-black text-slate-800' },
                        { key: 'answer', label: 'Answer', type: 'textarea', style: 'text-sm font-medium text-slate-500 leading-relaxed' }
                    ]
                };
            case 'faqStats':
                return {
                    items: data.stats || [],
                    fields: [
                        { key: 'label', label: 'Label', type: 'text', style: 'text-[10px] font-black uppercase tracking-widest text-slate-400' },
                        { key: 'value', label: 'Value', type: 'text', style: 'text-3xl font-black text-blue-600' }
                    ]
                };
            case 'testimonial':
                return {
                    items: [data], // Testimonial is single object in this mock
                    fields: [
                        { key: 'quote', label: 'Quote', type: 'textarea', style: 'text-lg italic font-medium text-slate-700' },
                        { key: 'authorName', label: 'Author', type: 'text', style: 'text-sm font-bold text-slate-900' },
                        { key: 'authorRole', label: 'Role', type: 'text', style: 'text-xs text-slate-500' }
                    ]
                };
            case 'capabilities':
                return {
                    items: data.capabilities || [],
                    fields: [
                        { key: 'title', label: 'Title', type: 'text', style: 'text-lg font-bold text-slate-800' },
                        { key: 'description', label: 'Description', type: 'textarea', style: 'text-sm text-slate-600' }
                    ]
                };
            case 'productReleases':
                return {
                    items: data.releases || [],
                    fields: [
                        { key: 'title', label: 'Title', type: 'text', style: 'text-lg font-bold text-slate-800' },
                        { key: 'versions', label: 'Versions', type: 'text', style: 'text-sm font-mono text-blue-600' },
                        { key: 'date', label: 'Date', type: 'text', style: 'text-xs text-slate-400' }
                    ]
                };
            case 'hero':
                return {
                    items: [data],
                    fields: [
                        { key: 'eyebrow', label: 'Eyebrow', type: 'text', style: 'text-xs font-bold uppercase tracking-widest text-blue-600' },
                        { key: 'title', label: 'Headline', type: 'text', style: 'text-2xl font-black text-slate-900' },
                        { key: 'description', label: 'Subtext', type: 'textarea', style: 'text-sm text-slate-600' }
                    ]
                };
            case 'featureVideo':
                return {
                    items: [data],
                    fields: [
                        { key: 'eyebrow', label: 'Eyebrow', type: 'text', style: 'text-xs font-bold uppercase tracking-widest text-blue-600' },
                        { key: 'title', label: 'Title', type: 'text', style: 'text-2xl font-black text-slate-900' },
                        { key: 'description', label: 'Description', type: 'textarea', style: 'text-sm text-slate-600' }
                    ]
                };
            case 'discover':
                return {
                    items: data.valueProps || [],
                    fields: [
                        { key: 'title', label: 'Title', type: 'text', style: 'text-lg font-bold text-slate-800' },
                        { key: 'subtitle', label: 'Subtitle', type: 'textarea', style: 'text-sm text-slate-500' }
                    ]
                };
            default:
                return { items: [], fields: [] };
        }
    };

    const config = getConfig(selectedComponent);
    const items = config.items;
    const currentItem = items[currentItemIndex] || {};

    const handleFieldUpdate = (updates: { itemIndex: number, fieldName: string, value: string }[]) => {
        const newData = { ...allData };
        const componentData = { ...newData[selectedComponent] };

        // It's a list-based section
        const itemsKey = selectedComponent === 'bento' ? 'cards' :
            selectedComponent === 'faq' ? 'faqs' :
                selectedComponent === 'faqStats' ? 'stats' :
                    selectedComponent === 'capabilities' ? 'capabilities' :
                        selectedComponent === 'productReleases' ? 'releases' :
                            selectedComponent === 'discover' ? 'valueProps' : '';

        if (itemsKey && Array.isArray(componentData[itemsKey])) {
            const newItems = [...componentData[itemsKey]];
            updates.forEach(({ itemIndex, fieldName, value }) => {
                newItems[itemIndex] = { ...newItems[itemIndex], [fieldName]: value };
            });
            componentData[itemsKey] = newItems;
        } else {
            // Single object section or fallback
            updates.forEach(({ fieldName, value }) => {
                componentData[fieldName] = value;
            });
        }

        newData[selectedComponent] = componentData;
        setAllData(newData);
    };

    const handleFieldClick = (itemIndex: number, fieldName: string) => {
        if (editingField) return;

        if (!selectedField) {
            setSelectedField({ itemIndex, fieldName });
        } else if (selectedField.itemIndex === itemIndex && selectedField.fieldName === fieldName) {
            setSelectedField(null);
        } else {
            // REAL SWAP LOGIC
            const config = getConfig(selectedComponent);
            const sourceValue = config.items[selectedField.itemIndex][selectedField.fieldName];
            const targetValue = config.items[itemIndex][fieldName];

            if (typeof sourceValue === "string" && typeof targetValue === "string") {
                // We must update both simultaneously to avoid one overwrite the other in the local state
                handleFieldUpdate([
                    { itemIndex: selectedField.itemIndex, fieldName: selectedField.fieldName, value: targetValue },
                    { itemIndex, fieldName, value: sourceValue }
                ]);
            }
            setSelectedField(null);
        }
    };

    const handleDoubleClick = (itemIndex: number, fieldName: string) => {
        setSelectedField(null);
        setEditingField({ itemIndex, fieldName });
    };

    const handleFinish = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setIsSaving(false);
        router.push("/");
    };

    const [isNavOpen, setIsNavOpen] = useState(true);

    const Icon = COMPONENT_LABELS[selectedComponent].icon;

    // Flatten data for mapping source select
    const getFlattenedFields = (data: any, prefix = ''): { path: string, value: string }[] => {
        let fields: { path: string, value: string }[] = [];
        if (!data) return fields;
        for (const key in data) {
            const val = data[key];
            const path = prefix ? `${prefix}.${key}` : key;
            if (typeof val === 'string') {
                fields.push({ path, value: val });
            } else if (Array.isArray(val)) {
                val.forEach((item, i) => {
                    fields = [...fields, ...getFlattenedFields(item, `${path}.${i}`)];
                });
            } else if (typeof val === 'object' && val !== null) {
                fields = [...fields, ...getFlattenedFields(val, path)];
            }
        }
        return fields;
    };

    const sourceFields = getFlattenedFields(allData);

    const handleApplyMapping = (targetField: string, sourcePath: string) => {
        if (!sourcePath) {
            const newMappings = { ...mappings };
            delete newMappings[`${selectedComponent}.${currentItemIndex}.${targetField}`];
            setMappings(newMappings);
            return;
        }

        // Find value from sourcePath
        const parts = sourcePath.split('.');
        let val: any = allData;
        for (const part of parts) {
            val = val ? val[part] : undefined;
        }

        if (typeof val === 'string') {
            const pathKey = `${selectedComponent}.${currentItemIndex}.${targetField}`;
            setMappings({ ...mappings, [pathKey]: sourcePath });
            handleFieldUpdate([{ itemIndex: currentItemIndex, fieldName: targetField, value: val }]);
        }
    };

    const renderMapperView = () => (
        <div className="flex-1 flex gap-8 p-8 overflow-hidden bg-[#f1f5f9]">
            {/* LEFT: Entity Fields */}
            <div className="w-1/2 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-black text-slate-800">Entity Fields</h2>
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-[10px] font-black uppercase tracking-wider">Source Data</span>
                </div>

                {Object.keys(allData).map(sectionKey => (
                    <div key={sectionKey} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-4">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            {COMPONENT_LABELS[sectionKey as ComponentType]?.icon && (
                                <div className="text-blue-500">
                                    {(() => {
                                        const CompIcon = COMPONENT_LABELS[sectionKey as ComponentType].icon;
                                        return <CompIcon size={12} />;
                                    })()}
                                </div>
                            )}
                            {sectionKey}
                        </h3>
                        <div className="space-y-3">
                            {getFlattenedFields(allData[sectionKey], sectionKey).map(field => (
                                <div key={field.path} className="group relative bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-white transition-all">
                                    <div className="text-[9px] font-bold text-slate-400 mb-1">{field.path}</div>
                                    <div className="text-xs font-bold text-slate-800 truncate">{field.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Visual Line Decorator */}
            <div className="flex items-center justify-center">
                <div className="h-full w-px bg-slate-200" />
            </div>

            {/* RIGHT: Component Fields */}
            <div className="w-1/2 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-black text-slate-800">Component Fields</h2>
                    <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-[10px] font-black uppercase tracking-wider">Target Preview</span>
                </div>

                <div className="bg-white rounded-[2.5rem] border-2 border-blue-500 shadow-2xl p-8">
                    <div className="flex items-center gap-4 mb-8">
                        {config.fields.some(f => f.isImage) && (
                            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                                <img src={currentItem[config.fields.find(f => f.isImage)?.key || '']} className="w-full h-full object-cover" alt="" />
                            </div>
                        )}
                        <div>
                            <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{selectedComponent} - Item {currentItemIndex + 1}</div>
                            <h4 className="text-lg font-black text-slate-800">{currentItem.title || currentItem.label || "Mapping Focus"}</h4>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {config.fields.map(field => {
                            const pathKey = `${selectedComponent}.${currentItemIndex}.${field.key}`;
                            const mappedTo = mappings[pathKey];

                            return (
                                <div key={field.key} className="relative">
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                            {field.label}
                                            <span className="text-slate-300 font-normal">({field.key})</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={mappedTo || ""}
                                                onChange={(e) => handleApplyMapping(field.key, e.target.value)}
                                                className={`appearance-none pl-3 pr-8 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight border transition-all cursor-pointer ${mappedTo ? "bg-blue-600 border-blue-600 text-white" : "bg-slate-100 border-slate-200 text-slate-600"}`}
                                            >
                                                <option value="">Manual Entry</option>
                                                {sourceFields.map(src => (
                                                    <option key={src.path} value={src.path}>{src.path}</option>
                                                ))}
                                            </select>
                                            <ChevronRight size={10} className={`absolute right-2 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none ${mappedTo ? "text-white" : "text-slate-400"}`} />
                                        </div>
                                    </div>

                                    <div className={`w-full p-4 rounded-2xl border-2 ${mappedTo ? "bg-blue-50 border-blue-100" : "bg-slate-50 border-slate-100"}`}>
                                        <div className={`text-sm font-bold ${mappedTo ? "text-blue-900" : "text-slate-800"}`}>
                                            {currentItem[field.key] || "Empty"}
                                        </div>
                                    </div>

                                    {mappedTo && (
                                        <div className="absolute -top-2 left-6 px-2 py-0.5 bg-blue-600 text-white text-[8px] font-black rounded uppercase tracking-tighter flex items-center gap-1">
                                            <Zap size={8} /> Linked: {mappedTo}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-screen flex flex-col bg-[#f8fafc] text-[#1e293b] font-sans overflow-hidden">
            {/* Top Navigation Bar */}
            <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 z-50">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsNavOpen(!isNavOpen)}
                            className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors mr-2"
                        >
                            <Layout size={18} className={isNavOpen ? "text-blue-600" : ""} />
                        </button>

                        <h1 className="text-lg font-black tracking-tight text-[#0f172a]">
                            Bento <span className="text-blue-600">Editor</span>
                        </h1>
                    </div>
                    <div className="h-6 w-px bg-slate-200" />
                    <div className="flex items-center gap-2 text-slate-400">
                        <span className="text-[10px] font-black uppercase tracking-widest">{COMPONENT_LABELS[selectedComponent].label}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex bg-slate-100 p-1 rounded-xl mr-4">
                        <button
                            onClick={() => setIsMappingMode(false)}
                            className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${!isMappingMode ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                        >
                            Focus Editor
                        </button>
                        <button
                            onClick={() => setIsMappingMode(true)}
                            className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${isMappingMode ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                        >
                            Advanced Mapper
                        </button>
                    </div>

                    <button
                        onClick={() => router.push("/")}
                        className="px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-bold transition-all"
                    >
                        DISCARD
                    </button>
                    <button
                        onClick={handleFinish}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2 bg-[#0f172a] hover:bg-slate-800 text-white rounded-lg text-xs font-black transition-all shadow-md active:scale-95 disabled:opacity-70"
                    >
                        <Save size={14} />
                        {isSaving ? "Saving..." : "Save & Next"}
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* LEFT SIDEBAR: Navigation & Selector (Collapsible) */}
                <aside className={`bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out ${isNavOpen ? "w-72" : "w-0 opacity-0 -translate-x-full overflow-hidden"}`}>
                    <div className="p-4 border-b border-slate-100 mb-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">Select Component</label>
                        <div className="relative">
                            <select
                                value={selectedComponent}
                                onChange={(e) => {
                                    setSelectedComponent(e.target.value as ComponentType);
                                    setCurrentItemIndex(0);
                                    setEditingField(null);
                                }}
                                className="w-full appearance-none bg-slate-50 border border-slate-200 p-2.5 pr-8 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/10 cursor-pointer"
                            >
                                {Object.entries(COMPONENT_LABELS).map(([key, { label }]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                            <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-4">Items ({items.length})</label>
                        <div className="space-y-2">
                            {items.map((item: any, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setCurrentItemIndex(i);
                                        setEditingField(null);
                                    }}
                                    className={`w-full p-3 rounded-xl text-left transition-all flex items-center gap-3 border ${currentItemIndex === i
                                        ? "bg-blue-50 border-blue-100 shadow-sm"
                                        : "bg-transparent border-transparent hover:bg-slate-50 text-slate-500"
                                        }`}
                                >
                                    <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black ${currentItemIndex === i ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
                                        }`}>
                                        {i + 1}
                                    </div>
                                    <span className={`text-xs font-bold truncate ${currentItemIndex === i ? "text-blue-900" : "text-slate-600"}`}>
                                        {item.title || item.label || item.question || `Item ${i + 1}`}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* <div className="p-4 bg-slate-50 border-t border-slate-200">
                        <div className="flex items-center gap-2 text-blue-600 mb-2">
                            <Zap size={14} />
                            <span className="text-[10px] font-black uppercase tracking-wider">Pro Tip</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                            Double-click any field in the center stage to edit text instantly.
                        </p>
                    </div> */}
                </aside>

                {/* CENTER AREA: Switch between Editor and Mapper */}
                {isMappingMode ? renderMapperView() : (
                    <main className="flex-1 bg-[#f1f5f9] overflow-y-auto p-8 custom-scrollbar">
                        <div className="max-w-3xl mx-auto flex flex-col items-center">
                            <div className="w-full flex items-center justify-between mb-8 px-4">
                                <div>
                                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Editing Live Preview</h3>
                                    <p className="text-[10px] font-bold text-slate-400">Card Focus Mode</p>
                                </div>
                                <div className="flex items-center gap-4 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
                                    <button
                                        onClick={() => setCurrentItemIndex(prev => Math.max(0, prev - 1))}
                                        disabled={currentItemIndex === 0}
                                        className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 disabled:opacity-20 transition-colors"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <span className="text-[10px] font-black text-slate-800 min-w-[40px] text-center">{currentItemIndex + 1} / {items.length}</span>
                                    <button
                                        onClick={() => setCurrentItemIndex(prev => Math.min(items.length - 1, prev + 1))}
                                        disabled={currentItemIndex >= items.length - 1}
                                        className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 disabled:opacity-20 transition-colors"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* THE FOCUS CARD UI (Big in center) */}
                            <div className="w-full bg-white rounded-[3rem] border border-slate-100 shadow-2xl p-10 flex flex-col animate-in fade-in zoom-in duration-500 relative">
                                {/* Background subtle decoration */}
                                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50/30 rounded-bl-[100px] -z-10" />

                                {config.fields.some(f => f.isImage) && (
                                    <div className="h-72 w-full rounded-3xl overflow-hidden mb-10 bg-slate-50 shadow-inner border border-slate-100 flex items-center justify-center relative group/image">
                                        <img
                                            src={currentItem[config.fields.find(f => f.isImage)?.key || '']}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                                            alt=""
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white text-[10px] font-black uppercase tracking-widest">Double Click URL to Change</span>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-6 flex-1 flex flex-col justify-center max-w-xl mx-auto w-full">
                                    {config.fields.map((field) => {
                                        if (field.isImage) return null;

                                        const isEditing = editingField?.itemIndex === currentItemIndex && editingField.fieldName === field.key;
                                        const isSelected = selectedField?.itemIndex === currentItemIndex && selectedField.fieldName === field.key;

                                        return (
                                            <div
                                                key={field.key}
                                                onClick={() => handleFieldClick(currentItemIndex, field.key)}
                                                onDoubleClick={() => handleDoubleClick(currentItemIndex, field.key)}
                                                className={`relative group/field cursor-pointer rounded-2xl p-5 transition-all flex flex-col items-center justify-center min-h-[70px] text-center border-2 ${isSelected
                                                    ? "bg-blue-600 border-blue-600 shadow-xl shadow-blue-200 -translate-y-1"
                                                    : "bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-100"
                                                    }`}
                                            >
                                                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 whitespace-nowrap bg-slate-800 text-white text-[8px] font-black uppercase tracking-widest rounded shadow-sm transition-opacity ${isSelected ? "opacity-100" : "opacity-0 group-hover/field:opacity-100"}`}>
                                                    {field.label} {isEditing ? "(Editing)" : ""}
                                                </div>

                                                {isEditing ? (
                                                    field.type === 'textarea' ? (
                                                        <textarea
                                                            ref={editInputRef as any}
                                                            autoFocus
                                                            value={currentItem[field.key] || ''}
                                                            onChange={(e) => handleFieldUpdate([{ itemIndex: currentItemIndex, fieldName: field.key, value: e.target.value }])}
                                                            onBlur={() => setEditingField(null)}
                                                            className="w-full bg-transparent border-none outline-none resize-none text-center font-medium h-32 text-sm scrollbar-hide"
                                                        />
                                                    ) : (
                                                        <input
                                                            ref={editInputRef as any}
                                                            autoFocus
                                                            value={currentItem[field.key] || ''}
                                                            onChange={(e) => handleFieldUpdate([{ itemIndex: currentItemIndex, fieldName: field.key, value: e.target.value }])}
                                                            onBlur={() => setEditingField(null)}
                                                            onKeyDown={(e) => e.key === "Enter" && setEditingField(null)}
                                                            className="w-full bg-transparent border-none outline-none text-center font-bold text-lg"
                                                        />
                                                    )
                                                ) : (
                                                    <div className={`${field.style} ${isSelected ? "text-white/90" : ""} ${field.type === 'textarea' ? 'text-sm' : 'text-lg'}`}>
                                                        {currentItem[field.key] || `Empty ${field.label}`}
                                                    </div>
                                                )}

                                                {isSelected && (
                                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-blue-600 text-[10px] font-black rounded-full shadow-lg border border-blue-50 uppercase tracking-tighter">
                                                        Active for Swap
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Help Banner */}
                            <div className="mt-12 grid grid-cols-3 gap-6 w-full max-w-2xl">
                                {[
                                    { title: "Pick & Swap", desc: "Click a field, then another to swap", icon: Layout },
                                    { title: "Instant Edit", desc: "Double click to change text", icon: Star },
                                    { title: "Auto Sync", desc: "Saves to your local browser", icon: Zap }
                                ].map((step, i) => (
                                    <div key={i} className="flex flex-col items-center text-center space-y-2">
                                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-500 shadow-sm">
                                            <step.icon size={14} />
                                        </div>
                                        <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wider">{step.title}</h4>
                                        <p className="text-[9px] text-slate-400 font-medium">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>
                )}

                {/* RIGHT SIDEBAR: Visual composition overview (Smaller) */}
                <aside className="w-80 bg-white border-l border-slate-200 flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.02)] z-10">
                    <div className="p-4 border-b border-slate-100">
                        <h2 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] mb-1">Visual Composition</h2>
                        <p className="text-[9px] text-slate-400 font-bold">Quick grid overview</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4">
                        {items.map((item: any, i: number) => (
                            <div
                                key={i}
                                onClick={() => {
                                    setCurrentItemIndex(i);
                                    setEditingField(null);
                                }}
                                className={`group relative bg-[#f8fafc] rounded-2xl border-2 transition-all cursor-pointer overflow-hidden p-3 flex flex-col ${currentItemIndex === i
                                    ? "border-blue-600 shadow-lg shadow-blue-50 bg-white scale-[1.02]"
                                    : "border-transparent hover:border-slate-200 hover:bg-white"
                                    }`}
                            >
                                {config.fields.some(f => f.isImage) ? (
                                    <div className="aspect-video w-full overflow-hidden rounded-lg mb-2">
                                        <img
                                            src={item[config.fields.find(f => f.isImage)?.key || '']}
                                            className={`w-full h-full object-cover grayscale transition-all duration-500 ${currentItemIndex === i ? 'grayscale-0' : 'group-hover:grayscale-0'}`}
                                            alt=""
                                        />
                                    </div>
                                ) : (
                                    <div className={`aspect-video w-full flex items-center justify-center rounded-lg mb-2 transition-colors ${currentItemIndex === i ? 'bg-blue-50' : 'bg-slate-100'}`}>
                                        <div className={`text-2xl font-black ${currentItemIndex === i ? 'text-blue-600' : 'text-slate-300'}`}>
                                            {i + 1}
                                        </div>
                                    </div>
                                )}
                                <div className="">
                                    <div className="text-[8px] font-black text-blue-600 uppercase tracking-widest mb-0.5">{item.label || 'ITEM'}</div>
                                    <div className="text-[10px] font-black text-slate-800 truncate">{item.title || item.question || `Untitled Item`}</div>
                                </div>

                                {currentItemIndex === i && (
                                    <div className="absolute top-2 right-2 w-4 h-4 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                                        <Save size={8} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* <div className="p-4 border-t border-slate-100 bg-slate-50">
                        <div className="flex items-center gap-2 mb-2">
                            <Layout size={12} className="text-blue-600" />
                            <h4 className="text-[10px] font-black text-blue-900 uppercase">Interactive Grid</h4>
                        </div>
                        <p className="text-[9px] text-blue-700/70 font-medium leading-relaxed">
                            Click any card in this grid to focus it for detailed editing in the center stage.
                        </p>
                    </div> */}
                </aside>
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
                body {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    background-color: #f8fafc;
                }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}

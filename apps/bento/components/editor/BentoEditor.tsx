"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { BentoSection as BentoSectionType, BentoCard } from "@standup/contracts/argus/bento";

interface BentoEditorProps {
    initialData: BentoSectionType;
}

interface SelectedField {
    cardIndex: number;
    fieldName: keyof BentoCard;
}

export default function BentoEditor({ initialData }: BentoEditorProps) {
    const router = useRouter();
    const [data, setData] = useState<BentoSectionType>(initialData);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [selectedField, setSelectedField] = useState<SelectedField | null>(null);
    const [editingField, setEditingField] = useState<SelectedField | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const editInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    // Initialize from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("bento-data");
        if (saved) {
            try {
                setData(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load saved bento data", e);
            }
        }
    }, []);

    // Auto-save to localStorage
    useEffect(() => {
        localStorage.setItem("bento-data", JSON.stringify(data));
    }, [data]);

    useEffect(() => {
        if (editingField && editInputRef.current) {
            editInputRef.current.focus();
        }
    }, [editingField]);

    const handleFieldUpdate = (cardIndex: number, fieldName: keyof BentoCard, value: string) => {
        const newCards = [...data.cards];
        newCards[cardIndex] = { ...newCards[cardIndex], [fieldName]: value };
        setData({ ...data, cards: newCards });
    };

    const handleFieldClick = (cardIndex: number, fieldName: keyof BentoCard) => {
        if (editingField) return;

        if (!selectedField) {
            setSelectedField({ cardIndex, fieldName });
        } else if (selectedField.cardIndex === cardIndex && selectedField.fieldName === fieldName) {
            setSelectedField(null);
        } else {
            const sourceValue = data.cards[selectedField.cardIndex][selectedField.fieldName];
            const targetValue = data.cards[cardIndex][fieldName];

            if (typeof sourceValue === "string" && typeof targetValue === "string") {
                const newCards = [...data.cards];

                const updatedSource = {
                    ...newCards[selectedField.cardIndex],
                    [selectedField.fieldName]: targetValue
                };
                newCards[selectedField.cardIndex] = updatedSource;

                const updatedTarget = {
                    ...(selectedField.cardIndex === cardIndex ? updatedSource : newCards[cardIndex]),
                    [fieldName]: sourceValue
                };
                newCards[cardIndex] = updatedTarget;

                setData({ ...data, cards: newCards });
            }
            setSelectedField(null);
        }
    };

    const handleDoubleClick = (cardIndex: number, fieldName: keyof BentoCard) => {
        setSelectedField(null);
        setEditingField({ cardIndex, fieldName });
    };

    const handleFinish = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 600));
        setIsSaving(false);
        router.push("/");
    };

    const currentCard = data.cards[currentCardIndex];

    return (
        <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans p-8 flex flex-col items-center">
            {/* Minimal Modern Header */}
            <header className="w-full max-w-4xl mb-12 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-[#0f172a]">Bento <span className="text-blue-600">Editor</span></h1>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">Single Card Focus</p>
                </div>
                <button
                    onClick={handleFinish}
                    disabled={isSaving}
                    className="px-8 py-2.5 bg-[#0f172a] hover:bg-slate-800 text-white rounded-xl text-sm font-black transition-all shadow-lg active:scale-95 disabled:opacity-70"
                >
                    {isSaving ? "SYNCING..." : "SAVE & EXIT"}
                </button>
            </header>

            <main className="w-full max-w-4xl flex flex-col items-center">
                <div className="flex items-center gap-8 w-full">
                    {/* PREV BUTTON */}
                    <button
                        onClick={() => setCurrentCardIndex(prev => Math.max(0, prev - 1))}
                        disabled={currentCardIndex === 0}
                        className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm hover:bg-slate-50 transition-all disabled:opacity-20 disabled:cursor-not-allowed active:scale-90 select-none"
                        aria-label="Previous card"
                    >
                        &lt;
                    </button>

                    {/* FOCUS CARD */}
                    <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl p-6 flex flex-col animate-in fade-in zoom-in duration-500">
    {/* Reduced margin-bottom and height for a more compact image */}
    <div className="h-56 w-full rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-inner">
        <img src={currentCard.imageUrl} className="w-full h-full object-cover" alt="" />
    </div>

    {/* space-y-4 creates a tighter vertical rhythm between text blocks */}
    <div className="space-y-4 flex-1">
        {/* Label Field */}
        <div
            onClick={() => handleFieldClick(currentCardIndex, "label")}
            onDoubleClick={() => handleDoubleClick(currentCardIndex, "label")}
            className={`relative group/field cursor-pointer rounded-xl p-2 transition-all flex flex-col items-center justify-center min-h-[40px] ${selectedField?.cardIndex === currentCardIndex && selectedField?.fieldName === "label"
                    ? "bg-blue-600 text-white shadow-md ring-4 ring-blue-100"
                    : "hover:bg-slate-50 border border-transparent hover:border-slate-100"
                }`}
            data-testid="field-label"
        >
            {editingField?.cardIndex === currentCardIndex && editingField.fieldName === "label" ? (
                <input
                    ref={editInputRef as any}
                    autoFocus
                    value={currentCard.label}
                    onChange={(e) => handleFieldUpdate(currentCardIndex, "label", e.target.value)}
                    onBlur={() => setEditingField(null)}
                    onKeyDown={(e) => e.key === "Enter" && setEditingField(null)}
                    className="w-full bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest text-center"
                />
            ) : (
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${selectedField?.cardIndex === currentCardIndex && selectedField.fieldName === "label" ? "text-white/80" : "text-blue-600"}`}>
                    {currentCard.label}
                </span>
            )}
            {selectedField?.cardIndex === currentCardIndex && selectedField.fieldName === "label" && (
                <span className="text-[8px] font-black absolute -top-2.5 px-2 py-0.5 bg-blue-600 text-white rounded shadow-sm uppercase tracking-tighter">Selected</span>
            )}
        </div>

        {/* Title Field */}
        <div
            onClick={() => handleFieldClick(currentCardIndex, "title")}
            onDoubleClick={() => handleDoubleClick(currentCardIndex, "title")}
            className={`relative group/field cursor-pointer rounded-xl p-4 transition-all min-h-[80px] flex flex-col justify-center text-center ${selectedField?.cardIndex === currentCardIndex && selectedField?.fieldName === "title"
                    ? "bg-blue-600 text-white shadow-md ring-4 ring-blue-100"
                    : "hover:bg-slate-50 border border-transparent hover:border-slate-100"
                }`}
            data-testid="field-title"
        >
            {editingField?.cardIndex === currentCardIndex && editingField.fieldName === "title" ? (
                <input
                    ref={editInputRef as any}
                    autoFocus
                    value={currentCard.title}
                    onChange={(e) => handleFieldUpdate(currentCardIndex, "title", e.target.value)}
                    onBlur={() => setEditingField(null)}
                    onKeyDown={(e) => e.key === "Enter" && setEditingField(null)}
                    className="w-full bg-transparent border-none outline-none text-xl font-black leading-tight text-center"
                />
            ) : (
                <h3 className={`text-xl font-black leading-tight ${selectedField?.cardIndex === currentCardIndex && selectedField.fieldName === "title" ? "text-white" : "text-slate-800"}`}>
                    {currentCard.title}
                </h3>
            )}
            {selectedField?.cardIndex === currentCardIndex && selectedField.fieldName === "title" && (
                <span className="text-[8px] font-black absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-blue-600 text-white rounded shadow-sm uppercase tracking-tighter">Selected</span>
            )}
        </div>

        {/* Description Field */}
        <div
            onClick={() => handleFieldClick(currentCardIndex, "description")}
            onDoubleClick={() => handleDoubleClick(currentCardIndex, "description")}
            className={`relative group/field cursor-pointer rounded-xl p-4 transition-all min-h-[100px] flex flex-col justify-center text-center ${selectedField?.cardIndex === currentCardIndex && selectedField?.fieldName === "description"
                    ? "bg-blue-600 text-white shadow-md ring-4 ring-blue-100"
                    : "hover:bg-slate-50 border border-transparent hover:border-slate-100"
                }`}
            data-testid="field-description"
        >
            {editingField?.cardIndex === currentCardIndex && editingField.fieldName === "description" ? (
                <textarea
                    ref={editInputRef as any}
                    autoFocus
                    value={currentCard.description}
                    onChange={(e) => handleFieldUpdate(currentCardIndex, "description", e.target.value)}
                    onBlur={() => setEditingField(null)}
                    className="w-full bg-transparent border-none outline-none text-xs font-medium leading-relaxed h-20 resize-none text-center"
                />
            ) : (
                <p className={`text-xs font-medium leading-relaxed ${selectedField?.cardIndex === currentCardIndex && selectedField.fieldName === "description" ? "text-blue-50" : "text-slate-500"}`}>
                    {currentCard.description}
                </p>
            )}
            {selectedField?.cardIndex === currentCardIndex && selectedField.fieldName === "description" && (
                <span className="text-[8px] font-black absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-blue-600 text-white rounded shadow-sm uppercase tracking-tighter">Selected</span>
            )}
        </div>
    </div>
</div>
                    {/* NEXT BUTTON */}
                    <button
                        onClick={() => setCurrentCardIndex(prev => Math.min(data.cards.length - 1, prev + 1))}
                        disabled={currentCardIndex === data.cards.length - 1}
                        className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm hover:bg-slate-50 transition-all disabled:opacity-20 disabled:cursor-not-allowed active:scale-90 select-none"
                        aria-label="Next card"
                    >
                        &gt;
                    </button>
                </div>

                {/* MODAL / STATUS BAR */}
                <div className="mt-8 flex items-center gap-6">
                    <div className="flex gap-2">
                        {data.cards.map((_, i) => (
                            <div
                                key={i}
                                className={`h-2 rounded-full transition-all duration-500 ${currentCardIndex === i ? "w-8 bg-blue-600 shadow-md shadow-blue-200" : "w-2 bg-slate-200"}`}
                            />
                        ))}
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Card {currentCardIndex + 1} of {data.cards.length}</span>
                </div>

                {/* HELP BANNER */}
                <div className="mt-12 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-blue-500" />
                        <span className="text-[10px] font-black text-blue-900 uppercase">Single Click: Pick & Swap</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-slate-300" />
                        <span className="text-[10px] font-black text-slate-600 uppercase">Double Click: Text Edit</span>
                    </div>
                </div>
            </main>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
                body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #f8fafc; }
            `}</style>
        </div>
    );
}

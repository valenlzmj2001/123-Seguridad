import { useState, useEffect, useRef } from "react";
import {
    Phone,
    PhoneCall,
    Shield,
    Anchor,
    Wind,
    AlertTriangle,
    User,
    Mail,
    Lock,
    ChevronRight,
    MapPin,
    Activity,
    FileText,
    Clock,
    CheckCircle,
    Loader,
    Send,
    Camera,
    Video,
    Mic,
    Plus,
    X,
    Bell,
    LogOut,
    ArrowLeft,
    Navigation,
    UserPlus,
    Eye,
    EyeOff,
    ChevronDown,
    Heart,
    Radio,
    Pencil,
    Save,
    KeyRound,
    Droplets,
    Building2,
    Home,
    PhoneIncoming,
    UserCog,
    ChevronUp,
    Hand,
    Siren,
    Scale,
    UserSearch,
    Bomb,
} from "lucide-react";

// ─── Color tokens ─────────────────────────────────────────────────────────────
const C = {
    blue: "#019EE3",
    dark: "#282F3F",
    bg: "#F3F3F5",
    white: "#FFFFFF",
    red: "#f21616",
};

// ─── Utility ──────────────────────────────────────────────────────────────────
const cls = (...args) => args.filter(Boolean).join(" ");

// ─── Default mock profile ─────────────────────────────────────────────────────
const DEFAULT_PROFILE = {
    name: "Juan Pérez García",
    cedula: "1020304050", // LOCKED – cannot change
    email: "juan.perez@correo.com",
    phone: "310 555 0001",
    city: "Bogotá",
    address: "Cra 7 #45-12",
    blood: "O+",
    medical: "Ninguna",
    username: "juan.perez",
    password: "1020304050",
    contacts: [{ name: "María García", phone: "311 222 3344" }],
};

// ─── Atoms ────────────────────────────────────────────────────────────────────
const Badge = ({ status }) => {
    const map = {
        Enviado: { bg: "#DBEAFE", text: "#2563EB" }, // blue-100 y blue-600
        Procesando: { bg: "#FEF3C7", text: "#D97706" }, // amber-100 y amber-600
        Atendido: { bg: "#DCFCE7", text: "#16A34A" }, // green-100 y green-600
    };

    const colors = map[status] || { bg: "#F3F4F6", text: "#4B5563" };

    return (
        <span
            className="text-xs font-medium px-2.5 py-1 rounded-full inline-block"
            style={{
                backgroundColor: colors.bg,
                color: colors.text,
            }}
        >
            {status}
        </span>
    );
};

const Input = ({ label, type = "text", value, onChange, placeholder, icon: Icon, disabled, hint }) => {
    const [show, setShow] = useState(false);
    const t = type === "password" ? (show ? "text" : "password") : type;
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
                    {hint && <span className="text-xs text-gray-400 italic">{hint}</span>}
                </div>
            )}
            <div className="relative">
                {Icon && <Icon size={16} className="absolute left-3 top-4 -translate-y-1/2 text-gray-400" />}
                <input
                    type={t}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cls(
                        "w-full rounded-xl border py-3 text-sm placeholder-gray-400 transition-all",
                        "focus:outline-none focus:ring-2 focus:border-transparent",
                        Icon ? "pl-9" : "pl-4",
                        type === "password" ? "pr-10" : "pr-4",
                        disabled
                            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white border-gray-200 text-gray-800",
                    )}
                    style={{ "--tw-ring-color": C.blue + "40" }}
                />
                {type === "password" && !disabled && (
                    <button
                        type="button"
                        onClick={() => setShow(!show)}
                        className="absolute right-3 top-4 -translate-y-1/2 text-gray-400"
                    >
                        {show ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                )}
            </div>
        </div>
    );
};

const Btn = ({ children, variant = "primary", onClick, className, disabled, style }) => {
    const base =
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none";
    const variants = {
        primary: "px-5 py-3 text-white shadow-md",
        outline: "px-5 py-3 border-2 bg-transparent",
        ghost: "px-4 py-2 text-gray-500 hover:text-gray-700",
        danger: "px-5 py-3 text-white shadow-md",
    };
    const colors = {
        primary: { backgroundColor: C.blue },
        danger: { backgroundColor: C.red },
        outline: { borderColor: C.blue, color: C.blue },
    };
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{ ...colors[variant], ...style }}
            className={cls(base, variants[variant], className)}
        >
            {children}
        </button>
    );
};

const Toast = ({ msg, type = "success", onClose }) => {
    useEffect(() => {
        const t = setTimeout(onClose, 3000);
        return () => clearTimeout(t);
    }, [onClose]);

    const bg = type === "success" ? C.green : type === "error" ? C.red : C.blue;

    return (
        <div
            style={{
                position: "fixed",
                top: 20,
                left: "50%",
                transform: "translateX(-50%)",
                background: bg,
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 14,
                zIndex: 9999,
                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                animation: "slideDown .3s ease",
            }}
        >
            {msg}
        </div>
    );
};

const Modal = ({ open, onClose, children }) => {
    useEffect(() => {
        if (open) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
        >
            <div className="w-full max-w-sm bg-white rounded-t-3xl shadow-2xl animate-slide-up overflow-hidden">
                {/* drag handle */}
                <div className="flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1 rounded-full bg-gray-200" />
                </div>
                <div className="px-6 pb-8 pt-2 flex flex-col gap-4">
                    {children}
                    <button
                        onClick={onClose}
                        className="w-full py-3 rounded-full font-bold text-sm text-white shadow-md active:scale-95 transition-all"
                        style={{ backgroundColor: C.blue }}
                    >
                        Entendido
                    </button>
                </div>
            </div>
            <style>{`
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.28s cubic-bezier(0.32,0.72,0,1); }
      `}</style>
        </div>
    );
};

const DIAL_CODES = [
    { code: "+57", name: "Colombia" },
    { code: "+1", name: "EE.UU." },
    { code: "+52", name: "México" },
    { code: "+58", name: "Venezuela" },
    { code: "+593", name: "Ecuador" },
    { code: "+51", name: "Perú" },
    { code: "+55", name: "Brasil" },
    { code: "+54", name: "Argentina" },
    { code: "+56", name: "Chile" },
    { code: "+34", name: "España" },
    { code: "+44", name: "Reino Unido" },
    { code: "+49", name: "Alemania" },
    { code: "+33", name: "Francia" },
];

const PhoneDialInput = ({ value, onChange, dialCode, onDialChange, hasError, onClearError }) => {
    const [open, setOpen] = useState(false);
    const selected = DIAL_CODES.find((d) => d.code === dialCode) || DIAL_CODES[0];
    return (
        <div className="relative flex flex-col gap-1">
            <div
                className={cls(
                    "flex rounded-xl border overflow-hidden transition-all focus-within:ring-2",
                    hasError
                        ? "border-red-400 bg-red-50 focus-within:ring-red-200"
                        : "border-gray-200 bg-white focus-within:ring-blue-200",
                )}
            >
                {/* Dial selector */}
                <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    className={cls(
                        "flex items-center gap-1.5 px-3 py-3 border-r text-sm font-semibold flex-shrink-0 transition-colors",
                        hasError ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 hover:bg-gray-100",
                    )}
                >
                    <span className="text-gray-700">{selected.code}</span>
                    <ChevronDown
                        size={13}
                        className={cls("text-gray-400 transition-transform", open && "rotate-180")}
                    />
                </button>
                {/* Number input */}
                <input
                    type="tel"
                    value={value}
                    placeholder="300 000 0000"
                    onChange={(e) => {
                        onChange(e.target.value);
                        if (onClearError) onClearError();
                    }}
                    className="flex-1 py-3 px-3 text-sm text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none"
                />
            </div>
            {/* Dropdown */}
            {open && (
                <div className="absolute top-full left-0 z-30 mt-1 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="max-h-52 overflow-y-auto py-1">
                        {DIAL_CODES.map((d) => (
                            <button
                                key={d.code}
                                type="button"
                                onClick={() => {
                                    onDialChange(d.code);
                                    setOpen(false);
                                }}
                                className={cls(
                                    "w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors hover:bg-gray-50",
                                    d.code === dialCode ? "font-bold bg-gray-100" : "font-medium text-gray-700",
                                )}
                            >
                                <span className="text-base">{d.flag}</span>
                                <span className="flex-1">{d.name}</span>
                                <span className="text-gray-400 font-mono text-xs">{d.code}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// ─── Defense lines ─────────────────────────────────────────────────────────────
const LINES = [
    { num: "165", icon: Hand, desc: "Secuestro y Extorsión", color: "#6366f1" },
    { num: "157", icon: Scale, desc: "Anticorrupción", color: "#059669" },
    { num: "122", icon: UserSearch, desc: "Desaparición", color: "#0284c7" },
    { num: "146", icon: Bomb, desc: "Terrorismo", color: "#7c3aed" },
];

// ─── Screen: Directory ─────────────────────────────────────────────────────────
const DirectoryScreen = ({ loggedIn, Toast }) => {
    const [pulse, setPulse] = useState(true);
    const call = (line) => {
        toast(`Llamando al ${line.num} – ${line.desc}…`, "info");
    };
    useEffect(() => {
        const t = setInterval(() => setPulse((p) => !p), 800);
        return () => clearInterval(t);
    }, []);
    return (
        <div className="flex flex-col gap-5 pb-6 items-center">
            {loggedIn && (
                <div
                    className="flex items-center gap-2.5 rounded-2xl px-4 py-3 text-sm font-medium"
                    style={{ backgroundColor: C.blue + "15", color: C.blue }}
                >
                    <Navigation size={15} />
                    <span>Transmitiendo ubicación en tiempo real</span>
                </div>
            )}
            <div className="flex flex-col items-center gap-5 py-8">
                <div className="text-center">
                    <h1 className="text-xl font-black" style={{ color: C.dark }}>
                        Emergencias de Defensa
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">Toca para llamar de inmediato</p>
                </div>
                <button
                    className="relative w-32 h-32 rounded-full py-6 text-white flex flex-col items-center gap-2 border-8 border-red-300 shadow-lg active:scale-98 transition-transform overflow-hidden"
                    style={{ backgroundColor: C.red }}
                >
                    <div
                        className={cls(
                            "absolute inset-0 rounded-2xl transition-opacity duration-700",
                            pulse ? "opacity-20" : "opacity-0",
                        )}
                        style={{ backgroundColor: "white" }}
                    />
                    <div className="flex flex-col items-center gap-2 z-10">
                        <PhoneCall size={36} />
                        <span className="text-2xl font-black tracking-tight">123</span>
                    </div>
                </button>
                <p className="text-xs text-gray-400 text-center max-w-xs">
                    Al llamar al 123 se conectará con las autoridades de seguridad nacional
                </p>
            </div>

            <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Líneas Especializadas</p>
                <div className="grid grid-cols-2 gap-3">
                    {LINES.map(({ num, icon: Icon, desc, color }) => (
                        <button
                            key={num}
                            onClick={() => call(l)}
                            className="items-center gap-4 rounded-2xl bg-white px-4 py-3.5 shadow-sm border border-gray-100 active:scale-98 transition-all hover:shadow-md"
                            style={{ backgroundColor: color + "40", color: "white" }}
                        >
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Icon size={30} style={{ color }} />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-black" style={{ color }}>
                                    Llamar {num}
                                </span>
                            </div>
                            <div className="flex flex-col items-start flex-1 min-w-0">
                                <span className="text-xs text-gray-700 truncate">{desc}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ─── Screen: Login ─────────────────────────────────────────────────────────────
const LoginScreen = ({ onLogin, onGoRegister }) => {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const handle = () => {
        if (!user || !pass) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onLogin();
        }, 1200);
    };
    return (
        <div className="flex flex-col gap-5">
            <div className="text-center pt-4 pb-2">
                <h2 className="text-2xl font-black" style={{ color: C.dark }}>
                    Iniciar Sesión
                </h2>
                <p className="text-sm text-gray-500 mt-1">Accede a tu perfil</p>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
                <Input
                    label="Usuario"
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="John Doe"
                    icon={User}
                />
                <Input
                    label="Contraseña"
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="••••••••"
                    icon={Lock}
                />
                <Btn onClick={handle} disabled={loading || !user || !pass} className="w-full mt-2">
                    {loading ? <Loader size={16} className="animate-spin" /> : <>Ingresar</>}
                </Btn>
                <button onClick={onGoRegister} className="flex items-center justify-center gap-1.5 text-sm py-2">
                    <p className="text-gray-500">¿No tienes cuenta?</p>
                    <p className="font-semibold" style={{ color: C.blue }}>
                        Regístrate
                    </p>
                </button>
            </div>
        </div>
    );
};

// ─── Screen: Register ──────────────────────────────────────────────────────────
const RegisterScreen = ({ onBack, onDone }) => {
    // field indices: 0=Nombre, 1=Cédula, 2=Email, 3=Celular, 4=Ciudad, 5=Dirección
    const [vals, setVals] = useState(["", "", "", "", "", ""]);
    const [dialCode, setDialCode] = useState("+57");
    const [blood, setBlood] = useState("");
    const [med, setMed] = useState("");
    const [contacts, setContacts] = useState([{ name: "", phone: "" }]);
    const [done, setDone] = useState(false);
    const [modal, setModal] = useState(false); // notices modal
    const [errors, setErrors] = useState({}); // field-level errors

    // Celular (index 3) is rendered separately with the dial-code picker
    const fields = [
        ["Nombre Completo", "text", "Juan Pérez García", true, 0],
        ["Cédula / Documento", "text", "1234567890", true, 1],
        ["Correo Electrónico", "email", "correo@ejemplo.com", false, 2],
        // index 3 = Celular → rendered separately
        ["Ciudad", "text", "Bogotá", false, 4],
        ["Dirección Residencial", "text", "Cra 7 #45-12", false, 5],
    ];

    const REQUIRED_IDX = [0, 1, 3]; // Nombre, Cédula, Celular

    const addContact = () => setContacts((c) => [...c, { name: "", phone: "" }]);
    const rmContact = (i) => setContacts((c) => c.filter((_, idx) => idx !== i));

    const validate = () => {
        const errs = {};
        REQUIRED_IDX.forEach((i) => {
            if (!vals[i].trim()) errs[i] = "Este campo es obligatorio";
        });
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        setModal(true); // show notices modal first
    };

    const confirmRegister = () => {
        setModal(false);
        setDone(true);
        setTimeout(onDone, 1400);
    };

    if (done)
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-16">
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: C.blue }}
                >
                    <CheckCircle size={32} className="text-white" />
                </div>
                <p className="text-xl font-black" style={{ color: C.dark }}>
                    ¡Registro exitoso!
                </p>
                <p className="text-sm text-gray-500 text-center">Iniciando sesión con tu cédula como contraseña…</p>
                <Loader size={20} className="animate-spin" style={{ color: C.blue }} />
            </div>
        );

    return (
        <>
            {/* ── Notices modal ───────────────────────────────────────────── */}
            <Modal open={modal} onClose={confirmRegister}>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: C.blue + "18" }}
                        >
                            <Shield size={20} style={{ color: C.blue }} />
                        </div>
                        <p className="font-black text-lg" style={{ color: C.dark }}>
                            Antes de continuar
                        </p>
                    </div>

                    {/* Default credentials notice */}
                    <div
                        className="rounded-2xl p-4"
                        style={{ backgroundColor: C.blue + "12", border: `2px solid ${C.blue}` }}
                    >
                        <p className="font-bold text-sm mb-1" style={{ color: C.blue }}>
                            Usuario y contraseña por defecto
                        </p>
                        <p className="text-gray-600 text-xs leading-relaxed">
                            Tu usuario y contraseña iniciales serán tu número de cédula. Podrás cambiarlos en cualquier
                            momento desde tu perfil.
                        </p>
                    </div>

                    {/* GPS / privacy notice */}
                    <div
                        className="rounded-2xl p-4"
                        style={{ backgroundColor: C.blue + "12", border: `2px solid ${C.blue}` }}
                    >
                        <p className="font-bold text-sm mb-1 text-orange-600" style={{ color: C.blue }}>
                            Aviso de privacidad y GPS
                        </p>
                        <p className="text-gray-600 text-xs leading-relaxed">
                            Al activar una alerta, tu ubicación GPS y datos personales serán transmitidos en tiempo real
                            a las autoridades de defensa y a tus contactos de emergencia registrados.
                        </p>
                    </div>
                </div>
            </Modal>

            {/* ── Form ────────────────────────────────────────────────────── */}
            <div className="flex flex-col gap-5 pb-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-1 text-sm font-semibold -ml-1"
                    style={{ color: C.blue }}
                >
                    <ArrowLeft size={16} /> Volver
                </button>

                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-black" style={{ color: C.dark }}>
                        Crear Cuenta
                    </h2>
                    <p className="text-xs text-gray-400">
                        Los campos marcados con <span className="text-red-500 font-bold">*</span> son obligatorios
                    </p>
                </div>

                <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col gap-2">
                    <p className="font-bold text-md" style={{ color: C.dark }}>
                        Datos Personales
                    </p>
                    {fields.map(([label, type, ph, required, realIdx]) => {
                        const i = realIdx;
                        // After Email (index 2), inject the Celular phone picker
                        const isAfterEmail = realIdx === 4;
                        return (
                            <div key={label}>
                                {isAfterEmail && (
                                    <div className="flex flex-col gap-1 mb-4">
                                        <div className="flex items-center gap-1">
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Celular
                                            </label>
                                            <span className="text-red-500 text-xs font-bold">*</span>
                                        </div>
                                        <PhoneDialInput
                                            value={vals[3]}
                                            onChange={(v) => {
                                                const nv = [...vals];
                                                nv[3] = v;
                                                setVals(nv);
                                            }}
                                            dialCode={dialCode}
                                            onDialChange={setDialCode}
                                            hasError={!!errors[3]}
                                            onClearError={() => {
                                                const errs = { ...errors };
                                                delete errs[3];
                                                setErrors(errs);
                                            }}
                                        />
                                        {errors[3] && (
                                            <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-0.5">
                                                <X size={11} /> {errors[3]}
                                            </p>
                                        )}
                                    </div>
                                )}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            {label}
                                        </label>
                                        {required && <span className="text-red-500 text-xs font-bold">*</span>}
                                    </div>
                                    <input
                                        type={type}
                                        value={vals[i]}
                                        placeholder={ph}
                                        onChange={(e) => {
                                            const v = [...vals];
                                            v[i] = e.target.value;
                                            setVals(v);
                                            if (errors[i]) {
                                                const errs = { ...errors };
                                                delete errs[i];
                                                setErrors(errs);
                                            }
                                        }}
                                        className={cls(
                                            "w-full rounded-xl border py-3 px-4 text-sm placeholder-gray-400 transition-all focus:outline-none focus:ring-2",
                                            errors[i]
                                                ? "border-red-400 bg-red-50 focus:ring-red-200"
                                                : "border-gray-200 bg-white text-gray-800",
                                        )}
                                    />
                                    {errors[i] && (
                                        <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-0.5">
                                            <X size={11} /> {errors[i]}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Blood type */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Tipo de Sangre
                        </label>
                        <div className="relative">
                            <select
                                value={blood}
                                onChange={(e) => setBlood(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-4 pr-9 text-sm text-gray-800 appearance-none focus:outline-none focus:ring-2"
                            >
                                <option value="">Seleccionar…</option>
                                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((t) => (
                                    <option key={t}>{t}</option>
                                ))}
                            </select>
                            <ChevronDown
                                size={15}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                            />
                        </div>
                    </div>

                    {/* Medical */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Condiciones / Alergias
                        </label>
                        <textarea
                            value={med}
                            onChange={(e) => setMed(e.target.value)}
                            rows={3}
                            placeholder="Ej: Diabético, alérgico a la penicilina…"
                            className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2"
                        />
                    </div>
                </div>

                {/* Emergency contacts */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-md" style={{ color: C.dark }}>
                            Contactos de Emergencia
                        </p>
                        <button
                            onClick={addContact}
                            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full"
                            style={{ backgroundColor: C.blue + "18", color: C.blue }}
                        >
                            <Plus size={13} /> Agregar
                        </button>
                    </div>
                    {contacts.map((c, i) => (
                        <div key={i} className="flex gap-2">
                            <div className="flex flex-col gap-2 flex-1">
                                <input
                                    value={c.name}
                                    onChange={(e) => {
                                        const nc = [...contacts];
                                        nc[i].name = e.target.value;
                                        setContacts(nc);
                                    }}
                                    placeholder="Nombre del contacto"
                                    className="rounded-xl border border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:outline-none"
                                />
                                <input
                                    value={c.phone}
                                    onChange={(e) => {
                                        const nc = [...contacts];
                                        nc[i].phone = e.target.value;
                                        setContacts(nc);
                                    }}
                                    placeholder="Celular"
                                    className="rounded-xl border border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:outline-none"
                                />
                            </div>
                            {contacts.length > 1 && (
                                <button
                                    onClick={() => rmContact(i)}
                                    className="self-start p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-50 mt-0.5"
                                >
                                    <X size={15} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <Btn onClick={handleSubmit} className="w-full">
                    Crear Cuenta
                </Btn>
            </div>
        </>
    );
};

// ─── Screen: Profile (edit) ────────────────────────────────────────────────────
const ProfileScreen = ({ profile, onSave, onBack }) => {
    const [data, setData] = useState({ ...profile });
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [saved, setSaved] = useState(false);
    const [passErr, setPassErr] = useState("");

    const set = (key, val) => setData((d) => ({ ...d, [key]: val }));
    const setContact = (i, key, val) => {
        const nc = [...data.contacts];
        nc[i] = { ...nc[i], [key]: val };
        setData((d) => ({ ...d, contacts: nc }));
    };
    const addContact = () => setData((d) => ({ ...d, contacts: [...d.contacts, { name: "", phone: "" }] }));
    const rmContact = (i) => setData((d) => ({ ...d, contacts: d.contacts.filter((_, idx) => idx !== i) }));

    const handleSave = () => {
        if (newPass || confirmPass) {
            if (newPass !== confirmPass) {
                setPassErr("Las contraseñas no coinciden.");
                return;
            }
            if (newPass.length < 6) {
                setPassErr("Mínimo 6 caracteres.");
                return;
            }
        }
        setPassErr("");
        const updated = { ...data };
        if (newPass) updated.password = newPass;
        setSaved(true);
        setTimeout(() => {
            setSaved(false);
            onSave(updated);
            onBack();
        }, 1200);
    };

    // initials from name
    const initials = data.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();

    return (
        <div className="flex flex-col gap-5 pb-10">
            {/* Back */}
            <button
                onClick={onBack}
                className="flex items-center gap-1 text-sm font-semibold -ml-1"
                style={{ color: C.blue }}
            >
                <ArrowLeft size={16} /> Volver
            </button>

            {/* Avatar hero */}
            <div className="flex flex-col items-center gap-3 py-4">
                <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black text-white shadow-lg"
                    style={{ backgroundColor: C.blue }}
                >
                    {initials}
                </div>
                <div className="text-center">
                    <p className="font-black text-lg" style={{ color: C.dark }}>
                        {data.name}
                    </p>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">CC {data.cedula}</p>
                </div>
            </div>

            {/* ── Section: Personal ─────────────────────────────────────────── */}
            <Section title="Datos Personales" icon={User}>
                <Input
                    label="Nombre Completo"
                    value={data.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Nombre completo"
                    icon={User}
                />
                <Input label="Cédula / Documento" value={data.cedula} disabled icon={Lock} hint="No modificable" />
                <Input
                    label="Correo Electrónico"
                    type="email"
                    value={data.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="correo@ejemplo.com"
                    icon={Mail}
                />
                <Input
                    label="Celular"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="300 000 0000"
                    icon={Phone}
                />
                <Input
                    label="Ciudad"
                    value={data.city}
                    onChange={(e) => set("city", e.target.value)}
                    placeholder="Ciudad"
                    icon={Building2}
                />
                <Input
                    label="Dirección"
                    value={data.address}
                    onChange={(e) => set("address", e.target.value)}
                    placeholder="Cra 7 #45-12"
                    icon={Home}
                />
            </Section>

            {/* ── Section: Medical ──────────────────────────────────────────── */}
            <Section title="Datos Médicos" icon={Activity}>
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Tipo de Sangre
                    </label>
                    <div className="relative">
                        <Droplets size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                            value={data.blood}
                            onChange={(e) => set("blood", e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-9 text-sm text-gray-800 appearance-none focus:outline-none focus:ring-2"
                        >
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((t) => (
                                <option key={t}>{t}</option>
                            ))}
                        </select>
                        <ChevronDown
                            size={15}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Condiciones / Alergias
                    </label>
                    <textarea
                        value={data.medical}
                        onChange={(e) => set("medical", e.target.value)}
                        rows={3}
                        placeholder="Ej: Diabético, alérgico a la penicilina…"
                        className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2"
                    />
                </div>
            </Section>

            {/* ── Section: Account ──────────────────────────────────────────── */}
            <Section title="Cuenta de Acceso" icon={UserCog}>
                <Input
                    label="Nombre de Usuario"
                    value={data.username}
                    onChange={(e) => set("username", e.target.value)}
                    placeholder="usuario123"
                    icon={User}
                />
                <div
                    className="rounded-xl p-3 text-xs text-gray-500 flex items-start gap-2"
                    style={{ backgroundColor: C.bg }}
                >
                    <KeyRound size={13} className="mt-0.5 flex-shrink-0 text-gray-400" />
                    <span>
                        Para cambiar la contraseña, ingresa la nueva contraseña y confírmala. Déjalo en blanco para
                        mantener la actual.
                    </span>
                </div>
                <Input
                    label="Nueva Contraseña"
                    type="password"
                    value={newPass}
                    onChange={(e) => {
                        setNewPass(e.target.value);
                        setPassErr("");
                    }}
                    placeholder="Mínimo 6 caracteres"
                    icon={Lock}
                />
                <Input
                    label="Confirmar Contraseña"
                    type="password"
                    value={confirmPass}
                    onChange={(e) => {
                        setConfirmPass(e.target.value);
                        setPassErr("");
                    }}
                    placeholder="Repetir contraseña"
                    icon={Lock}
                />
                {passErr && (
                    <p className="text-xs font-semibold text-red-500 flex items-center gap-1.5">
                        <X size={12} /> {passErr}
                    </p>
                )}
            </Section>

            {/* ── Section: Emergency Contacts ───────────────────────────────── */}
            <Section
                title="Contactos de Emergencia"
                icon={PhoneIncoming}
                action={
                    <button
                        onClick={addContact}
                        className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full"
                        style={{ backgroundColor: C.blue + "18", color: C.blue }}
                    >
                        <Plus size={13} /> Agregar
                    </button>
                }
            >
                {data.contacts.map((c, i) => (
                    <div key={i} className="flex gap-2 items-start">
                        <div className="flex flex-col gap-2 flex-1">
                            <input
                                value={c.name}
                                onChange={(e) => setContact(i, "name", e.target.value)}
                                placeholder="Nombre"
                                className="rounded-xl border border-gray-200 bg-white py-2.5 px-3 text-sm focus:outline-none"
                            />
                            <input
                                value={c.phone}
                                onChange={(e) => setContact(i, "phone", e.target.value)}
                                placeholder="Celular"
                                className="rounded-xl border border-gray-200 bg-white py-2.5 px-3 text-sm focus:outline-none"
                            />
                        </div>
                        {data.contacts.length > 1 && (
                            <button
                                onClick={() => rmContact(i)}
                                className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-50 mt-0.5"
                            >
                                <X size={15} />
                            </button>
                        )}
                    </div>
                ))}
            </Section>

            {/* Save */}
            <Btn onClick={handleSave} disabled={saved} className="w-full">
                {saved ? (
                    <>
                        <CheckCircle size={15} /> ¡Guardado!
                    </>
                ) : (
                    <>
                        <Save size={15} /> Guardar Cambios
                    </>
                )}
            </Btn>
        </div>
    );
};

// ─── Section wrapper ──────────────────────────────────────────────────────────
const Section = ({ title, icon: Icon, children, action }) => (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: C.blue + "18" }}
                >
                    <Icon size={14} style={{ color: C.blue }} />
                </div>
                <p className="font-bold text-sm" style={{ color: C.dark }}>
                    {title}
                </p>
            </div>
            {action}
        </div>
        {children}
    </div>
);

// ─── Alert Modal ──────────────────────────────────────────────────────────────
const AlertModal = ({ open, onClose }) => {
    const [phase, setPhase] = useState("counting"); // counting | sent
    const [count, setCount] = useState(10);
    const timerRef = useRef(null);

    // Reset every time the modal opens
    useEffect(() => {
        if (!open) return;
        setPhase("counting");
        setCount(10);
    }, [open]);

    useEffect(() => {
        if (!open || phase !== "counting") return;
        if (count === 0) {
            setPhase("sent");
            return;
        }
        timerRef.current = setTimeout(() => setCount((c) => c - 1), 1000);
        return () => clearTimeout(timerRef.current);
    }, [open, phase, count]);

    const cancel = () => {
        clearTimeout(timerRef.current);
        onClose();
    };

    const close = () => {
        clearTimeout(timerRef.current);
        onClose();
    };

    // SVG circle progress (countdown ring)
    const radius = 72;
    const circ = 2 * Math.PI * radius;
    const progress = phase === "counting" ? count / 10 : 0;
    const dash = circ * progress;

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)" }}
        >
            <div
                className="w-full max-w-sm bg-white rounded-t-3xl shadow-2xl overflow-hidden"
                style={{ animation: "slide-up 0.28s cubic-bezier(0.32,0.72,0,1)" }}
            >
                {/* Drag handle */}
                <div className="flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1 rounded-full bg-gray-200" />
                </div>

                <div className="px-6 pt-3 pb-8 flex flex-col items-center gap-5">
                    {/* ── COUNTING phase ─────────────────────────────────── */}
                    {phase === "counting" && (
                        <>
                            <div className="text-center">
                                <p className="text-lg font-black" style={{ color: C.red }}>
                                    ¡Enviando alerta!
                                </p>
                                <p className="text-sm text-gray-500 mt-0.5">Cancela si fue un error</p>
                            </div>

                            {/* Circular countdown */}
                            <div className="relative w-44 h-44 flex items-center justify-center">
                                <svg
                                    className="absolute inset-0 -rotate-90"
                                    width="176"
                                    height="176"
                                    viewBox="0 0 176 176"
                                >
                                    {/* Track */}
                                    <circle cx="88" cy="88" r={radius} fill="none" stroke="#FFE0E0" strokeWidth="8" />
                                    {/* Progress */}
                                    <circle
                                        cx="88"
                                        cy="88"
                                        r={radius}
                                        fill="none"
                                        stroke={C.red}
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        strokeDasharray={`${dash} ${circ}`}
                                        style={{ transition: "stroke-dasharray 0.9s linear" }}
                                    />
                                </svg>
                                <div className="flex flex-col items-center z-10">
                                    <span className="text-6xl font-black leading-none" style={{ color: C.red }}>
                                        {count}
                                    </span>
                                    <span className="text-xs font-semibold text-gray-400 mt-1">segundos</span>
                                </div>
                            </div>

                            <p className="text-xs text-gray-400 text-center leading-relaxed">
                                Tu ubicación GPS será enviada a las fuerzas de defensa y a tus contactos de emergencia
                            </p>

                            <button
                                onClick={cancel}
                                className="w-full py-3.5 rounded-full font-bold text-sm border-2 text-gray-700 bg-white shadow-sm active:scale-95 transition-all"
                                style={{ borderColor: C.dark }}
                            >
                                ✕ Cancelar Alerta
                            </button>
                        </>
                    )}

                    {/* ── SENT phase ─────────────────────────────────────── */}
                    {phase === "sent" && (
                        <>
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg flex-shrink-0"
                                style={{ backgroundColor: C.red }}
                            >
                                <CheckCircle size={34} className="text-white" />
                            </div>

                            <div className="text-center">
                                <p className="text-xl font-black" style={{ color: C.dark }}>
                                    ¡Alerta Enviada!
                                </p>
                                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                                    Estás compartiendo tu ubicación en tiempo real con las fuerzas de defensa y tus
                                    contactos de emergencia.
                                </p>
                            </div>

                            {/* Live location card */}
                            <div
                                className="w-full rounded-2xl p-4 flex flex-col gap-2.5"
                                style={{ backgroundColor: C.red + "10", border: `1.5px solid ${C.red}30` }}
                            >
                                <div className="flex items-center gap-2" style={{ color: C.red }}>
                                    <div
                                        className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
                                        style={{ backgroundColor: C.red }}
                                    />
                                    <span className="text-sm font-bold">Compartiendo ubicación en vivo</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <MapPin size={12} />
                                    <span className="font-mono">4.7110° N, 74.0721° W — Bogotá</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Navigation size={12} />
                                    <span>Señal activa · Autoridades notificadas</span>
                                </div>
                            </div>

                            <button
                                onClick={close}
                                className="w-full py-3.5 rounded-full font-bold text-sm text-white active:scale-95 transition-all shadow-md"
                                style={{ backgroundColor: C.dark }}
                            >
                                Cerrar
                            </button>
                        </>
                    )}
                </div>
            </div>
            <style>{`
        @keyframes slide-up { from { transform:translateY(100%); } to { transform:translateY(0); } }
      `}</style>
        </div>
    );
};

// ─── Screen: Reports ──────────────────────────────────────────────────────────
const CATEGORIES = ["Amenaza terrorista", "Secuestro", "Extorsión", "Infiltración", "Tráfico de armas", "Otro"];
const INIT_REPORTS = [
    {
        id: 1,
        cat: "Amenaza terrorista",
        desc: "Actividad sospechosa en zona rural",
        status: "Atendido",
        date: "28 may 2025",
    },
    {
        id: 2,
        cat: "Extorsión",
        desc: "Llamadas extorsivas a establecimiento",
        status: "Procesando",
        date: "31 may 2025",
    },
    { id: 3, cat: "Infiltración", desc: "Personas desconocidas en perímetro", status: "Enviado", date: "1 jun 2025" },
];
const ReportsScreen = () => {
    const [cat, setCat] = useState("");
    const [desc, setDesc] = useState("");
    const [reports, setReports] = useState(INIT_REPORTS);
    const [sent, setSent] = useState(false);
    const submit = () => {
        if (!cat || !desc.trim()) return;
        const newR = {
            id: Date.now(),
            cat,
            desc,
            status: "Enviado",
            date: new Date().toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" }),
        };
        setSent(true);
        setTimeout(() => {
            setReports((r) => [newR, ...r]);
            setCat("");
            setDesc("");
            setSent(false);
        }, 1000);
    };
    return (
        <div className="flex flex-col gap-6 pb-8">
            <div className="flex flex-col gap-4">
                <p className="font-bold text-md" style={{ color: C.dark }}>
                    Nuevo Reporte
                </p>
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoría</label>
                    <div className="relative">
                        <select
                            value={cat}
                            onChange={(e) => setCat(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-4 pr-9 text-sm text-gray-800 appearance-none focus:outline-none focus:ring-2"
                        >
                            <option value="">Seleccionar categoría…</option>
                            {CATEGORIES.map((c) => (
                                <option key={c}>{c}</option>
                            ))}
                        </select>
                        <ChevronDown
                            size={15}
                            className="absolute right-3 top-4 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Descripción</label>
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        rows={4}
                        placeholder="Describe la emergencia con el mayor detalle posible…"
                        className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2"
                    />
                </div>
                <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                        Adjuntar Evidencia
                    </label>
                    <div className="flex gap-3">
                        {[
                            { icon: Camera, label: "Foto" },
                            { icon: Video, label: "Video" },
                            { icon: Mic, label: "Audio" },
                        ].map(({ icon: Icon, label }) => (
                            <button
                                key={label}
                                className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-blue-300 hover:text-blue-400 transition-colors text-xs font-semibold"
                            >
                                <Icon size={18} />
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
                <Btn onClick={submit} disabled={!cat || !desc.trim() || sent} className="w-full">
                    {sent ? (
                        <>
                            <Loader size={15} className="animate-spin" /> Enviando…
                        </>
                    ) : (
                        <>
                            <Send size={15} /> Enviar Reporte
                        </>
                    )}
                </Btn>
            </div>
            <div className="mt-6 bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col gap-4 flex flex-col gap-3">
                <p className="font-bold text-md" style={{ color: C.dark }}>
                    Mis Reportes
                </p>
                {reports.map((r) => (
                    <div
                        key={r.id}
                        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-2"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <p className="font-bold text-sm" style={{ color: C.dark }}>
                                {r.cat}
                            </p>
                            <Badge status={r.status} />
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{r.desc}</p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Clock size={11} /> {r.date}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── App root ─────────────────────────────────────────────────────────────────
export default function App() {
    const [view, setView] = useState("public"); // public | login | register | app | profile
    const [tab, setTab] = useState("call");
    const [profile, setProfile] = useState(DEFAULT_PROFILE);
    const [alertOpen, setAlertOpen] = useState(false);

    const TABS = [
        { id: "call", icon: Phone, label: "Llamar" },
        { id: "alert", icon: Bell, label: "Alerta" },
        { id: "report", icon: FileText, label: "Reportar" },
    ];

    const isApp = view === "app";
    const isProfile = view === "profile";
    const showNav = isApp;

    const initials = profile.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();

    return (
        <div className="min-h-screen flex items-start justify-center" style={{ backgroundColor: "#E8E9ED" }}>
            {/* CAMBIO AQUÍ: Cambiado min-h-screen por h-screen y flex-col para controlar el scroll interno */}
            <div
                className="relative w-full max-w-sm h-screen flex flex-col bg-white shadow-2xl overflow-hidden"
                style={{ fontFamily: "'DM Sans','Nunito',system-ui,sans-serif" }}
            >
                {/* ── Alert Modal ───────────────────────────────────────────── */}
                <AlertModal open={alertOpen} onClose={() => setAlertOpen(false)} />

                {/* ── Header ────────────────────────────────────────────────── */}
                <header
                    className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-100 px-5 py-4 flex items-center justify-between flex-shrink-0"
                    style={{ paddingTop: "env(safe-area-inset-top, 16px)" }}
                >
                    <div className="flex items-center gap-2.5">
                        {isProfile ? (
                            <button className="flex items-center gap-1.5 -ml-1" style={{ color: C.blue }}>
                                <span className="font-bold text-sm">Mi Perfil</span>
                            </button>
                        ) : (
                            <>
                                <div className="leading-none">
                                    <p className="font-black text-md" style={{ color: C.blue }}>
                                        123 Seguridad
                                    </p>
                                    <p className="text-xs text-gray-400 font-medium">MinDefensa</p>
                                </div>
                            </>
                        )}
                    </div>

                    {!isApp && !isProfile ? (
                        <button
                            onClick={() => setView("login")}
                            className="flex items-center justify-center py-1 px-4 border-2 rounded-full hover:bg-blue-50 transition-colors"
                            style={{ color: C.blue, borderColor: C.blue }}
                        >
                            Ingresar
                        </button>
                    ) : (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setView(isProfile ? "app" : "profile")}
                                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black shadow-sm ring-2 ring-transparent hover:ring-blue-300 transition-all"
                                style={{ backgroundColor: C.blue }}
                            >
                                {initials}
                            </button>
                            {!isProfile && (
                                <button
                                    onClick={() => setView("public")}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <LogOut size={17} />
                                </button>
                            )}
                        </div>
                    )}
                </header>

                {/* ── Content ───────────────────────────────────────────────── */}
                <main
                    className="flex-1 overflow-y-auto px-5 pt-5"
                    style={{ paddingBottom: showNav ? "100px" : "32px" }}
                >
                    {view === "public" && <DirectoryScreen loggedIn={false} />}
                    {view === "login" && (
                        <LoginScreen onLogin={() => setView("app")} onGoRegister={() => setView("register")} />
                    )}
                    {view === "register" && (
                        <RegisterScreen onBack={() => setView("login")} onDone={() => setView("app")} />
                    )}
                    {view === "profile" && (
                        <ProfileScreen profile={profile} onSave={setProfile} onBack={() => setView("app")} />
                    )}
                    {isApp && tab === "call" && <DirectoryScreen loggedIn={true} />}
                    {isApp && tab === "report" && <ReportsScreen />}
                </main>

                {/* ── Bottom nav ────────────────────────────────────────────── */}
                {showNav && (
                    /* CAMBIO AQUÍ: Añadido left-1/2, bottom-0 y flex-shrink-0 para bloquear el nav en móviles */
                    <nav
                        className="fixed bottom-0 -translate-x-1/2 w-full max-w-sm z-20 bg-white border-t border-gray-100 flex-shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]"
                        style={{ paddingBottom: "env(safe-area-inset-bottom, 12px)" }}
                    >
                        <div className="flex items-center">
                            {TABS.map(({ id, icon: Icon, label }) => {
                                const active = tab === id && isApp;
                                const isAlert = id === "alert";
                                if (isAlert)
                                    return (
                                        <button
                                            key={id}
                                            onClick={() => setAlertOpen(true)}
                                            className="flex-1 flex flex-col items-center justify-center py-3 gap-1 -mt-5"
                                        >
                                            <div
                                                className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-white active:scale-95 transition-transform"
                                                style={{ backgroundColor: C.red }}
                                            >
                                                <Icon size={26} className="text-white" />
                                            </div>
                                            <span className="text-[11px] font-bold mt-1" style={{ color: C.dark }}>
                                                {label}
                                            </span>
                                        </button>
                                    );
                                return (
                                    <button
                                        key={id}
                                        onClick={() => {
                                            setView("app");
                                            setTab(id);
                                        }}
                                        className="flex-1 flex flex-col items-center justify-center py-4 gap-1 active:scale-95 transition-transform"
                                    >
                                        <Icon size={20} style={{ color: active ? C.blue : "#9ca3af" }} />
                                        <span
                                            className="text-[11px] font-semibold"
                                            style={{ color: active ? C.blue : "#9ca3af" }}
                                        >
                                            {label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </nav>
                )}
            </div>
        </div>
    );
}

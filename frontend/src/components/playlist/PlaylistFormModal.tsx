import { useEffect, useState, type FormEvent } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Modal } from "../ui/Modal";

export interface PlaylistFormValues {
  name: string;
  description: string;
}

interface PlaylistFormModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  initialValues?: PlaylistFormValues;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (values: PlaylistFormValues) => Promise<void> | void;
}

const emptyValues: PlaylistFormValues = { name: "", description: "" };

export function PlaylistFormModal({
  isOpen,
  mode,
  initialValues,
  isSubmitting = false,
  onClose,
  onSubmit,
}: PlaylistFormModalProps) {
  const [name, setName] = useState(initialValues?.name ?? emptyValues.name);
  const [description, setDescription] = useState(
    initialValues?.description ?? emptyValues.description
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setName(initialValues?.name ?? emptyValues.name);
    setDescription(initialValues?.description ?? emptyValues.description);
    setError(null);
  }, [isOpen, initialValues]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!name.trim()) {
      setError("Dê um nome para a sua playlist.");
      return;
    }

    setError(null);
    void onSubmit({ name: name.trim(), description: description.trim() });
  }

  const title = mode === "create" ? "Criar playlist" : "Editar os detalhes";
  const submitLabel = mode === "create" ? "Criar" : "Salvar";

  return (
    <Modal isOpen={isOpen} title={title} onClose={() => !isSubmitting && onClose()}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Nome"
          placeholder="Minha playlist"
          value={name}
          disabled={isSubmitting}
          onChange={(event) => setName(event.target.value)}
        />
        {error && <p className="text-12px text-red-500">{error}</p>}

        <Textarea
          label="Descrição"
          placeholder="Adicione uma descrição opcional"
          value={description}
          disabled={isSubmitting}
          onChange={(event) => setDescription(event.target.value)}
        />

        <div className="mt-2 flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            disabled={isSubmitting}
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

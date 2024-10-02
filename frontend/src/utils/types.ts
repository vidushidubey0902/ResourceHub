import { z } from "zod";
import {
  aboutResourceCollectionSchema,
  addNoteSchema,
  apiCodeGeneratorSchema,
  createRoadmapSchema,
  linksResourceFormSchema,
  loginSchema,
  reportResourceSchema,
  reviewSchema,
  signupSchema,
  updateProfileSchema,
} from "./schema";
import React, {
  ComponentType,
  ReactNode,
  RefObject,
  SetStateAction,
} from "react";
import {
  Control,
  FieldError,
  FieldErrors,
  Merge,
  Path,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { MotionValue } from "framer-motion";

export type ThemeType = "LIGHT" | "DARK";

export type LoginFormFields = z.infer<typeof loginSchema>;
export type SignupFormFields = z.infer<typeof signupSchema>;
export type UpdateProfileFields = z.infer<typeof updateProfileSchema>;
export type AboutResourceCollectionFields = z.infer<
  typeof aboutResourceCollectionSchema
>;
export type LinkResourceFormFields = z.infer<typeof linksResourceFormSchema>;
export type ReviewFormFields = z.infer<typeof reviewSchema>;
export type ReportResourceFields = z.infer<typeof reportResourceSchema>;
export type AddNoteFields = z.infer<typeof addNoteSchema>;
export type CreateRoadmapFields = z.infer<typeof createRoadmapSchema>;
export type ApiCodeGeneratorFields = z.infer<typeof apiCodeGeneratorSchema>;

interface SidebarIconProps {
  size: number;
  className: string;
}
export type SidebarIconType = ComponentType<SidebarIconProps>;

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
}

export interface ApiError {
  data?: {
    message?: string;
  };
  error?: string;
}

export type UpdateFieldType =
  | "name"
  | "email"
  | "oldPassword"
  | "newPassword"
  | "description";
export interface UpdateFieldConfig {
  name: UpdateFieldType;
  type: string;
  placeholder: string;
  error: FieldError | undefined;
  errorMessage: string | undefined;
}

export interface CreateResourceRequest {
  essentials: string[];
  extras: string[];
  description: string;
  notes: string;
  tags: string[];
  title: string;
}

export interface GetResourcesRequest {
  search?: string;
  sort?: string;
  filter?: string;
  pageNumber?: string;
}

export type ResourceSortType = "recent" | "oldest";
export type ResourceByRate = "highest" | "lowest";

export interface GetRoadmapRequest {
  search?: string;
  sort?: string;
  filter?: string;
  pageNumber?: string;
}

export type RoadmapSortType = "recent" | "oldest";
export type RoadmapByRate = "highest" | "lowest";

export interface ResourceProps {
  _id: string;
  title: string;
  isOfficial: boolean;
  links: object[];
  description: string;
  languages: string[];
  authorName: string;
}
export interface ResourceCardProps {
  resource: ResourceProps;
  index: number;
}
export interface MultipleResourceCardsProps {
  resources: ResourceProps[];
}

export interface RoadmapCardProps {
  _id(_id: any): void;
  title: ReactNode;
  isOfficial: any;
  description: string;
  tags: any;
  authorName: ReactNode;
  resource: RoadmapCardProps;
  index: number;
}
export interface MultipleRoadmapCardsProps {
  resources: RoadmapCardProps[];
}

export interface AddResourceRatingRequest {
  id: string;
  rating: number;
  comment: string;
}

export interface LatestCommentsProps {
  comment: string;
  placeholder: boolean;
}

export interface FavoriteResourceRequest {
  id: string;
}

export interface CheckFavoriteResponse {
  isFavorite: boolean;
}

export interface ReportModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  resourceId: string;
}

export interface AddNoteModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  requestRefetch: () => void;
}

export interface ShowAllNotesProps {
  isOpen: boolean;
  notes: Note[];
  onRequestClose: () => void;
  requestRefetch: () => void;
}

export interface ReportResourceRequest {
  resourceId: string;
  reason: string;
  comments: string;
}

export interface DetailedLinksAndNotesProps {
  links: [object];
  notes: string;
}

export interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  clicked: boolean;
}

export interface CreateNoteProps {
  title: string;
  content: string;
  color: string;
}

export type Note = {
  color: string;
  content: string;
  title: string;
  _id: string;
};

export interface DisplayNotesProps {
  notes: Note[];
  handleCreateNote: () => void;
}

export interface UpdateNoteProps {
  id: string;
  color: string;
}

export interface ModifyNoteProps {
  note: {
    color: string;
    _id: string;
  };
  requestRefetch: () => void;
}

export interface NotesSectionProps {
  isError: boolean;
  isLoading: boolean;
  handleViewAllNotes: () => void;
  handleCreateNote: () => void;
  data: Note[];
}

export interface RecentsState {
  id: string;
  title: string;
  type: "roadmap" | "resource";
}

export interface RecentlyVisitedState {
  recents: RecentsState[];
}

export interface CreateRoadmapProps {
  title: string;
  description: string;
  tags: string[];
  steps: {
    title: string;
    description: string;
    resources: string;
  }[];
}

export interface CreateRoadmapFieldsProps {
  register: UseFormRegister<CreateRoadmapFields>;
  errors: FieldErrors<CreateRoadmapFields>;
  control?: Control<CreateRoadmapFields>;
  watch: UseFormWatch<CreateRoadmapFields>;
  setValue: UseFormSetValue<CreateRoadmapFields>;
  setError: UseFormSetError<CreateRoadmapFields>;
  clearErrors: UseFormClearErrors<CreateRoadmapFields>;
}

export interface RoadmapTextInputProps {
  label: string;
  id: Path<CreateRoadmapFields>;
  placeholder: string;
  register: UseFormRegister<CreateRoadmapFields>;
  error?: FieldError;
}

export interface RoadmapTextAreaProps {
  label: string;
  id: Path<CreateRoadmapFields>;
  placeholder: string;
  register: UseFormRegister<CreateRoadmapFields>;
  error?: FieldError;
}

export interface RoadmapTagInputProps {
  watchTags: string[];
  errors: FieldErrors<CreateRoadmapFields>;
  tagInput: string;
  setTagInput: React.Dispatch<React.SetStateAction<string>>;
  tagInputRef: RefObject<HTMLInputElement>;
  handleTagKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleRemoveTag: (index: number) => void;
}

export interface ResourceInputProps {
  label: string;
  id: Path<CreateRoadmapFields>;
  resources: string[];
  resourceInput: string;
  onResourceInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResourceKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onRemoveResource: (resourceIdx: number) => void;
  onDivClick: () => void;
  disabled: boolean;
  resourceRef: HTMLInputElement | null;
  error?: string;
  placeholder: string;
}

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export interface LandingButtonProps {
  children: ReactNode;
  size?: "small" | "medium" | "large";
  className?: string;
}

export interface LandingFadeInProps {
  children: ReactNode;
}

export interface LandingCarouselProps {
  image: string;
  name: string;
  id: number;
}

export interface LandingWordsProps {
  children: ReactNode;
  range: [number, number];
  progress: MotionValue<number>;
  isLastWord: boolean;
}

export interface SponsorDetailsProps {
  eventName: string;
  eventDate: string;
  eventLink: string;
}

export type ApiCode = {
  data: {
    fileName: string;
    code: string;
  }[];
};

export interface CodeModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  code: ApiCode | null;
}

export interface LayoutProps {
  children: ReactNode;
}

export interface InputBoxProps {
  label: string;
  id: string;
  register: UseFormRegister<any>;
  type: string;
  placeholder: string;
  error?: FieldError;
  showHelperText: boolean;
  helperText?: string;
  className?: string;
}

export interface SelectBoxProps {
  label: string;
  id: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  options: string[];
}

export interface TextAreaBoxProps {
  label: string;
  id: string;
  register: UseFormRegister<any>;
  placeholder: string;
  error?: FieldError;
  helperText: string;
}

type LinkData = {
  to: string;
  text: string;
};

export interface TextWithLinksProps {
  message: string[];
  links: LinkData[];
}

export interface SeparatedInputBoxProps {
  label: string;
  id: string;
  inputRef: RefObject<HTMLInputElement>;
  watchField: string[];
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
  type: string;
  maxInputs: number;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleRemove: (index: number) => void;
  placeholder: string;
  error?: FieldError | Merge<FieldError, (FieldError | undefined)[]>;
  helperText: string;
  className?: string;
}

export interface AboutCollectionFormProps {
  onSubmit: (data: AboutResourceCollectionFields) => void;
}

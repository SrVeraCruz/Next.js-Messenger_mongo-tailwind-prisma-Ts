import { create } from "zustand"

 interface TypingStatusStoryType {
  typingMembers: string[],
  addTypingMember: (id: string) => void,
  removeTypingMember: (id: string) => void
 }

 const useTypingStatus = create<TypingStatusStoryType>((set) => ({
  typingMembers: [],
  addTypingMember: (id) => set((state) => ({ 
    typingMembers: [...state.typingMembers, id] 
  })),
  removeTypingMember: (id) => set((state) => ({
    typingMembers: state.typingMembers.filter((memberId) => memberId !== id)
  }))
 }))

 export default useTypingStatus
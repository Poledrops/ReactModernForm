import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Textarea } from "./components/ui/textarea";
import { Checkbox } from "./components/ui/checkbox";
import { Toaster, toast } from "sonner";

const formSchema = z.object({
  firstName: z.string().min(1, "Adınızı girmeniz zorunludur"),
  lastName: z.string().min(1, "Soyadınızı girmeniz zorunludur"),
  email: z.string().email("Email girmeniz zorunludur"),
  topic: z.enum(["frontend", "backend"]),
  message: z.string().min(10, "En az 10 karakter kullanmanız zorunludur"),
  terms: z.boolean().refine((val) => val === true, {
    message: "Politikalarımızı kabul etmelisiniz",
  }),
});

function App() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      topic: "frontend",
      message: "",
      terms: false,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form Gönderildi: ", data);
    toast.success("Form başarıyla gönderildi");
  };
  return (
    <>
      <Toaster position="top-center" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 p-10 rounded-2xl w-3xl"
        >
          <h1 className="text-3xl font-bold mb-8">Sorularınızı Sorun</h1>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adınız</FormLabel>
                  <FormControl>
                    <Input placeholder="Adınızı giriniz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Soyadınız</FormLabel>
                  <FormControl>
                    <Input placeholder="Soyadınızı giriniz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-[1/-1]">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email adresinizi giriniz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="topic"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-[1/-1]">
                  <FormLabel className="mb-1">
                    Ne hakkında konuşmak istersiniz?
                  </FormLabel>
                  <FormControl className="flex">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormItem className="flex items-center gap-3 basis-1/2">
                        <FormControl>
                          <RadioGroupItem value="frontend" />
                        </FormControl>
                        <FormLabel>FrontEnd</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="backend" />
                        </FormControl>
                        <FormLabel>BackEnd</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="message"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-[1/-1]">
                  <FormLabel>Mesajınız</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Mesajınızı giriniz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="terms"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-[1/-1]">
                  <div className="flex items-center gap-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm">
                      Kabul ediyorum ve Onaylıyorum
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full mt-4 h-12 text-xl">Gönder</Button>
        </form>
      </Form>
    </>
  );
}

export default App;

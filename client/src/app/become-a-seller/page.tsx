"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle, MinusCircle } from "lucide-react";
import { useEffect } from "react";
import { useAuthStore } from "@/store/use-auth.store";
import { createSellerForm, CreateSellerForm } from "@/schemas";
import Container from "@/components/container";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import OnlyBuyerPage from "@/components/protected-pages/only-buyer-page";
import { useCreateSeller } from "@/features/sellers/mutations/use-create-seller.mutation";
import { createSellerDefaultForm } from "@/features/auth/default-form-values/auth.form";

function ProfileForm() {
  const { buyer } = useAuthStore();

  const form = useForm<CreateSellerForm>({
    resolver: zodResolver(createSellerForm),
    defaultValues: createSellerDefaultForm(null),
    mode: "onChange",
  });

  useEffect(() => {
    if (buyer) {
      // Only reset if authUser exists
      form.reset(createSellerDefaultForm(buyer));
    }
  }, [buyer, form]);

  // Field Arrays for dynamic lists
  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control: form.control,
    name: "languages",
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const {
    fields: socialLinkFields,
    append: appendSocialLink,
    remove: removeSocialLink,
  } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

  const {
    fields: certificateFields,
    append: appendCertificate,
    remove: removeCertificate,
  } = useFieldArray({
    control: form.control,
    name: "certificates",
  });

  const { isPending, mutate: createSeller } = useCreateSeller({
    reset: form.reset,
    setError: form.setError,
  });

  // console.log(
  //   vals.username == authUser?.username ? "loaded-form" : "loading-form"
  // );

  // console.log("buyer is !!!!!!!!!!!!!!!!! ", buyer);
  // const router = useRouter();

  // if (!buyer?.isSeller) return router.push("/");

  return (
    <OnlyBuyerPage>
      {/* Breadcum */}
      <nav
        className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <Link
                href="/gigs"
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >
                Gigs
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                Create
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => createSeller(data))}
          // onSubmit={form.handleSubmit((data) => console.log(data))}
          className="flex flex-col gap-y-[24px]"
        >
          {/* <h2 className="text-2xl font-bold">Personal Information</h2> */}
          <Card className="px-[24px] shadow-lg">
            <CardTitle>
              <h2 className="text-2xl font-bold">Personal Information</h2>
            </CardTitle>
            <CardContent className="p-0 grid grid-cols-1 xl:grid-cols-2 gap-[24px]">
              <div className="flex flex-col gap-y-[24px]">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="oneliner"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your go-to full-stack developer for robust web apps!"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription>
                        A short, catchy phrase about yourself.
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about yourself..."
                          className="resize-y min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A detailed description of your experience and passion.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Languages Section */}
          <Card className="px-[24px] shadow-lg">
            <CardHeader className="p-0">
              <h2 className="text-2xl font-bold">Languages</h2>
            </CardHeader>
            <CardContent className="p-0 flex flex-col gap-y-[24px]">
              {languageFields.map((field, index) => (
                <div key={field.id} className="border p-4 rounded-md">
                  <div className="flex flex-col md:flex-row gap-4">
                    <FormField
                      control={form.control}
                      name={`languages.${index}.language`}
                      render={({ field: languageField }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Language</FormLabel>
                          <FormControl>
                            <Input placeholder="English" {...languageField} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`languages.${index}.level`}
                      render={({ field: levelField }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Level</FormLabel>
                          <Select
                            onValueChange={levelField.onChange}
                            defaultValue={levelField.value}
                          >
                            <FormControl className="w-full">
                              <SelectTrigger>
                                <SelectValue placeholder="Select a level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Native">Native</SelectItem>
                              <SelectItem value="Fluent">Fluent</SelectItem>
                              <SelectItem value="Conversational">
                                Conversational
                              </SelectItem>
                              <SelectItem value="Basic">Basic</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-[10px]">
                    <Button
                      type="button"
                      variant="destructive"
                      className="cursor-pointer"
                      // size="icon"
                      onClick={() => removeLanguage(index)}
                    >
                      {/* <MinusCircle className="h-4 w-4" /> */}
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>

            <CardFooter className="p-0">
              <Button
                type="button"
                className="cursor-pointer"
                onClick={() => appendLanguage({ language: "", level: "" })}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Language
              </Button>
            </CardFooter>
          </Card>

          {/* Skills Section */}
          <Card className="px-[24px] shadow-lg">
            <CardHeader className="p-0">
              <h2 className="text-2xl font-bold">Skills</h2>
            </CardHeader>

            <CardContent className="p-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[16px]">
              {skillFields.map((field, index) => (
                <div className="rounded-md" key={field.id}>
                  <div className="flex gap-4 items-center">
                    <FormField
                      control={form.control}
                      name={`skills.${index}.name`} // --- CHANGE THIS LINE ---
                      render={({ field: skillField }) => (
                        <FormItem className="flex-1">
                          {/* <FormLabel>Skill</FormLabel> */}
                          <FormControl>
                            <Input placeholder="JavaScript" {...skillField} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      className="cursor-pointer"
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeSkill(index)}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex items-center">
                <Button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => appendSkill({ name: "" })}
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Experience Section */}
          <Card className="px-[24px] shadow-lg">
            <CardHeader className="p-0">
              <h2 className="text-2xl font-bold">Experiences</h2>
            </CardHeader>

            <CardContent className="flex p-0 flex-col gap-y-[24px]">
              {experienceFields.map((field, index) => (
                <div key={field.id} className="border p-4 rounded-md">
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                    <div className="flex flex-col gap-y-[24px]">
                      <FormField
                        control={form.control}
                        name={`experience.${index}.company`}
                        render={({ field: expField }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Tech Solutions Inc."
                                {...expField}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`experience.${index}.title`}
                        render={({ field: expField }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Senior Software Engineer"
                                {...expField}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`experience.${index}.description`}
                        render={({ field: expField }) => (
                          <FormItem className="col-span-1 md:col-span-2">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Responsibilities and achievements..."
                                {...expField}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex flex-col gap-y-[24px]">
                      <FormField
                        control={form.control}
                        name={`experience.${index}.startDate`}
                        render={({ field: expField }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Start Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !expField.value && "text-muted-foreground"
                                    )}
                                  >
                                    {expField.value ? (
                                      format(new Date(expField.value), "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={
                                    expField.value
                                      ? new Date(expField.value)
                                      : undefined
                                  }
                                  onSelect={(date) =>
                                    expField.onChange(
                                      date?.toISOString().split("T")[0]
                                    )
                                  } // Store as "YYYY-MM-DD"
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`experience.${index}.endDate`}
                        render={({ field: expField }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>End Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !expField.value &&
                                        "text-muted-foreground",
                                      form.watch(
                                        `experience.${index}.currentlyWorkingHere`
                                      ) && "pointer-events-none opacity-50"
                                    )}
                                    disabled={form.watch(
                                      `experience.${index}.currentlyWorkingHere`
                                    )}
                                  >
                                    {expField.value ? (
                                      format(new Date(expField.value), "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={
                                    expField.value
                                      ? new Date(expField.value)
                                      : undefined
                                  }
                                  onSelect={(date) =>
                                    expField.onChange(
                                      date?.toISOString().split("T")[0]
                                    )
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`experience.${index}.currentlyWorkingHere`}
                        render={({ field: expField }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 col-span-1 md:col-span-2">
                            <FormControl>
                              <Checkbox
                                checked={expField.value}
                                onCheckedChange={(checked) => {
                                  expField.onChange(checked);
                                  if (checked) {
                                    form.setValue(
                                      `experience.${index}.endDate`,
                                      undefined
                                    ); // Clear end date if currently working
                                  }
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Currently working here</FormLabel>
                              <FormDescription>
                                Check if this is your current position.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-[20px]">
                    <Button
                      type="button"
                      className="cursor-pointer"
                      variant="destructive"
                      // size="icon"
                      onClick={() => removeExperience(index)}
                    >
                      {/* <MinusCircle className="h-4 w-4" /> */}
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>

            <CardFooter className="p-0">
              <Button
                type="button"
                onClick={() =>
                  appendExperience({
                    company: "",
                    title: "",
                    startDate: "",
                    currentlyWorkingHere: false,
                  })
                }
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
              </Button>
            </CardFooter>
          </Card>

          {/* Education Section */}
          <Card className="px-[24px] shadow-lg">
            <CardHeader className="p-0">
              <h2 className="text-2xl font-bold">Education</h2>
            </CardHeader>

            <CardContent className="flex p-0 flex-col gap-y-[24px]">
              {educationFields.map((field, index) => (
                <div key={field.id} className="border p-6 rounded-md space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-y-[24px]">
                      <FormField
                        control={form.control}
                        name={`education.${index}.country`}
                        render={({ field: eduField }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="United States"
                                {...eduField}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`education.${index}.university`}
                        render={({ field: eduField }) => (
                          <FormItem>
                            <FormLabel>University</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="State University"
                                {...eduField}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`education.${index}.title`}
                        render={({ field: eduField }) => (
                          <FormItem>
                            <FormLabel>Degree Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Bachelor of Science"
                                {...eduField}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-y-[24px]">
                      <FormField
                        control={form.control}
                        name={`education.${index}.major`}
                        render={({ field: eduField }) => (
                          <FormItem>
                            <FormLabel>Major</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Computer Science"
                                {...eduField}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`education.${index}.year`}
                        render={({ field: eduField }) => (
                          <FormItem>
                            <FormLabel>Year of Graduation</FormLabel>
                            <FormControl>
                              <Input placeholder="2018" {...eduField} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-[20px]">
                    <Button
                      type="button"
                      variant="destructive"
                      // size="icon"
                      onClick={() => removeEducation(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>

            <CardFooter className="p-0">
              <Button
                type="button"
                onClick={() =>
                  appendEducation({
                    country: "",
                    university: "",
                    title: "",
                    major: "",
                    year: "",
                  })
                }
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Education
              </Button>
            </CardFooter>
          </Card>

          {/* Social Links Section */}
          <Card className="px-[24px] shadow-lg">
            <CardHeader className="p-0">
              <h2 className="text-2xl font-bold">Social Links</h2>
            </CardHeader>

            <CardContent className="flex p-0 flex-col gap-y-[24px]">
              {socialLinkFields.map((field, index) => (
                <div key={field.id} className="border p-6 rounded-md space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`socialLinks.${index}.platform`}
                      render={({ field: socialField }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Platform</FormLabel>
                          <FormControl>
                            <Input placeholder="LinkedIn" {...socialField} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`socialLinks.${index}.link`}
                      render={({ field: socialField }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Link</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://linkedin.com/in/johndoe"
                              {...socialField}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-[20px]">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeSocialLink(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>

            <CardFooter className="p-0">
              <Button
                type="button"
                onClick={() => appendSocialLink({ platform: "", link: "" })}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Social Link
              </Button>
            </CardFooter>
          </Card>

          {/* Certificates Section */}
          <Card className="px-[24px] shadow-lg">
            <CardHeader className="p-0">
              <h2 className="text-2xl font-bold">Certificates</h2>
            </CardHeader>

            <CardContent className="flex p-0 flex-col gap-y-[24px]">
              {certificateFields.map((field, index) => (
                <div key={field.id} className="border p-6 rounded-md space-y-4">
                  <div
                    key={field.id}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {/* <div>

                    </div> */}
                    <FormField
                      control={form.control}
                      name={`certificates.${index}.name`}
                      render={({ field: certField }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Certificate Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="AWS Certified Developer – Associate"
                              {...certField}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`certificates.${index}.from`}
                      render={({ field: certField }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Issued By</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Amazon Web Services"
                              {...certField}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`certificates.${index}.year`}
                      render={({ field: certField }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Input placeholder="2022" {...certField} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-[20px]">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeCertificate(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>

            <CardFooter className="p-0">
              <Button
                type="button"
                onClick={() =>
                  appendCertificate({ name: "", from: "", year: "" })
                }
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Certificate
              </Button>
            </CardFooter>
          </Card>

          {/* <Button type="submit" className="mt-8">
            Save Profile
          </Button> */}

          <div className="col-span-12 xl:col-span-12">
            <Card className="px-[24px] shadow-lg h-full">
              <Button
                disabled={isPending}
                type="submit"
                className="cursor-pointer bg-[#6392D8] text-white py-[20px]"
              >
                {isPending ? "Saving..." : "Save Profile"}
              </Button>
            </Card>
          </div>
        </form>
      </Form>
    </OnlyBuyerPage>
  );
}

export default ProfileForm;
